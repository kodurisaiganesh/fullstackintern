import React, { useState } from "react";
import RatingStars from "./RatingStars";

export default function RatingForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <RatingStars rating={rating} onRate={setRating} />

      <label>Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={400}
        rows={3}
      />

      <button type="submit">Submit Rating</button>
    </form>
  );
}
