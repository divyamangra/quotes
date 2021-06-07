import React, { useState } from "react";
import "./SeenQuotes.css";
function SeenQuotes() {
  let AllQuotesSeen = () => {
    let seenItemsVar = window.sessionStorage.getItem("seenItems");
    return seenItemsVar ? JSON.parse(seenItemsVar) : [];
  };

  return (
    <div className="seenQuotes">
      {AllQuotesSeen().map(quote => (
        <div className="quoteDetails">
          <div>{quote.author}</div>
          <div>{quote.text}</div>
          <div>{quote.ratings}</div>
        </div>
      ))}
    </div>
  );
}

export default SeenQuotes;
