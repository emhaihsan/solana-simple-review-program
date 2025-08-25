import { Review } from "@/models/Review";
import React, { FC } from "react";

interface CardProps {
  review: Review;
}

const ReviewCard: FC<CardProps> = ({ review }) => {
  const { title, description, rating, location } = review;

  return (
    <div className="glass-card p-6 hover-lift glow-hover group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  rating > i
                    ? "bg-gradient-to-r from-purple-400 to-blue-400"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-purple-300 font-semibold ml-2">
            {rating}/10
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {/* Location */}
      <div className="flex items-center space-x-2 text-xs text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{location}</span>
      </div>

      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
};

export default ReviewCard;
