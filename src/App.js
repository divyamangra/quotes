import "./App.css";


import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function App() {
  const [quotes, setQuotes] = useState("");
  let history = useHistory();
  let listofSeenQuotes = () => {
    history.push("/SeenQuotes");
  };

  let fetchApi = () => {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(data => {
        let randomNumber = Math.trunc(Math.random() * data.length);
        console.log(data[randomNumber]);
        setQuotes(data[randomNumber]);
      });
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <div className="quotes">
        {quotes.text}
        <div>-{quotes.author}</div>
      </div>
      <div className="ratings">
        <Ratings text={quotes.text} author={quotes.author} />
        <button className="listButton" onClick={listofSeenQuotes}>
          List of rated Quotes
        </button>
      </div>
    </div>
  );
}

export default App;
