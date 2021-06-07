import "./App.css";
import stringSimilarity from "string-similarity";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function App() {
  const [quote, setQuote] = useState("");
  let history = useHistory();
  let listofSeenQuotes = () => {
    history.push("/SeenQuotes");
  };

  let latest = () => {
    let GlobalArray = [];
    let seenItemsVar = window.sessionStorage.getItem("seenItems");
    if (seenItemsVar) {
      GlobalArray = JSON.parse(seenItemsVar);
    }
    let AllHighRatedSeenElement = GlobalArray.filter(
      item => item.ratings && item.ratings > 3
    );
    return AllHighRatedSeenElement.length === 0
      ? ""
      : AllHighRatedSeenElement[AllHighRatedSeenElement.length - 1];
  };

  let AllQuotesSeen = () => {
    let seenItemsVar = window.sessionStorage.getItem("seenItems");
    return seenItemsVar ? JSON.parse(seenItemsVar) : [];
  };

  const findUnratedQuotes = (allQuotes, seenQuotes) => {
    let allSeenQuotesTextArray = seenQuotes.map(q => q.text);
    return allQuotes.filter(q => !allSeenQuotesTextArray.includes(q.text));
  };

  const findPreferredQuoteFrom = ratedQuotes => {
    const highRatedQuotes = ratedQuotes.filter(q => q.ratings && q.ratings > 3);
    return highRatedQuotes.length === 0
      ? undefined
      : highRatedQuotes[highRatedQuotes.length - 1];
  };

  const findSimilarQuoteAmongst = (unseenQuotes, preferredQuote) => {
    const unseenQuotesTextArray = unseenQuotes.map(q => q.text);
    let match = stringSimilarity.findBestMatch(
      preferredQuote.text,
      unseenQuotesTextArray
    );
    console.log(preferredQuote);
    const isRatingValid = match.bestMatch.rating > 0.3;
    if (isRatingValid) {
      return unseenQuotes[match.bestMatchIndex];
    }
    return undefined;
  };

  let fetchApi = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const allQuotes = await response.json();
    allQuotes.forEach(q => (q.key = q.text));
    const seenQuotes = AllQuotesSeen();

    const unseenQuotes = findUnratedQuotes(allQuotes, seenQuotes);
    console.log(unseenQuotes);
    const preferredQuote = findPreferredQuoteFrom(seenQuotes);
    // undefined check;
    let similarQuote;
    if (preferredQuote) {
      similarQuote = findSimilarQuoteAmongst(unseenQuotes, preferredQuote);
      console.log(similarQuote);
    }

    let nextQuote;
    if (similarQuote) {
      nextQuote = similarQuote;
    } else {
      let randomNumber = Math.trunc(Math.random() * unseenQuotes.length);
      nextQuote = unseenQuotes[randomNumber];
    }
    console.log(nextQuote);
    setQuote(nextQuote); // what t;
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <div className="quotes">
        {quote.text}
        <div>-{quote.author}</div>
      </div>
      <div className="ratings">
        <Ratings text={quote.text} author={quote.author} key={quote.key} />
        <button className="listButton" onClick={listofSeenQuotes}>
          List of rated Quotes
        </button>
      </div>
    </div>
  );
}

export default App;
