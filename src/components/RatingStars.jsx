import React from "react";

export default function RatingStars({ rating, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
