import { Star } from "lucide-react";
import React from "react";

export default function StarRating({ rating, maxStars = 5 }) {
  return (
    <div className="flex space-x-1">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
