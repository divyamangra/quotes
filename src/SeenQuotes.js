import React, { useState } from "react";
import "./SeenQuotes.css";
function SeenQuotes() {
  let arrayofquotes = [];
  let arrayofquoteKeys = Object.keys(sessionStorage);
  arrayofquoteKeys.map(key =>
    arrayofquotes.push(JSON.parse(sessionStorage[key]))
  );

  return (
    <div className="seenQuotes">
      {arrayofquotes.map(quote => (
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
