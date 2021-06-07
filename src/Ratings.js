import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Ratings(props) {
  let quoteDetails = {};
  // let seenQuotesArray = {};
  let [index, SetIndex] = useState(0);
  let GlobalArray = [];
  let seenItemsVar = window.sessionStorage.getItem("seenItems");
  if (seenItemsVar) {
    GlobalArray = JSON.parse(seenItemsVar);
  }

  let addtoArray = item => {
    if (item) {
      quoteDetails.text = props.text;
      quoteDetails.author = props.author;
      quoteDetails.ratings = item;
      quoteDetails.key = props.key;
      GlobalArray.push(quoteDetails);

      window.sessionStorage.setItem("seenItems", JSON.stringify(GlobalArray));

      SetIndex(index + 1);
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
          <label key={"label" + i}>
            <input
              type="radio"
              name="ratingsradio"
              value={ratingVal}
              key={"rating" + i}
              onClick={() => {
                setRating(ratingVal);
                addtoArray(ratingVal);
              }}
            />
            <FaStar
              key={"star" + i}
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
