import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Ratings(props) {

  let quoteDetails = {};
  let seenQuotesArray = {};
  let addtoArray = item => {
    if (item) {
      quoteDetails.text = props.text;
      quoteDetails.author = props.author;
      quoteDetails.ratings = item;
      seenQuotesArray[props.text] = quoteDetails;
      window.sessionStorage.setItem(props.text, JSON.stringify(quoteDetails));
      setTimeout(() => {
        window.location.reload();
      }, 250);
    }
  };

  let starsArray = [0, 1, 2, 3, 4];
  const [rating, setRating] = useState(null);
  return (
    <div>
      {starsArray.map(i => {
        const ratingVal = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="ratingsradio"
              value={ratingVal}
              onClick={() => {
                setRating(ratingVal);
                addtoArray(ratingVal);
              }}
            />
            <FaStar
              className="starcolor"
              color={ratingVal <= rating ? "yellow" : "grey"}
              size={100}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Ratings;
