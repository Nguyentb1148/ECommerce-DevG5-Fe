import React, { useState } from "react";

const RatingFilter = () => {
  const [selectedRating, setSelectedRating] = useState([]);

  const ratings = [
    { id: 5, label: "5 only", value: 5 },
    { id: 4, label: "4 and up", value: 4 },
    { id: 3, label: "3 and up", value: 3 },
    { id: 2, label: "2 and up", value: 2 },
    { id: 1, label: "1 and up", value: 1 },
  ];

  const toggleRating = (value) => {
    if (selectedRating.includes(value)) {
      setSelectedRating(selectedRating.filter((rating) => rating !== value));
    } else {
      setSelectedRating([...selectedRating, value]);
    }
  };

  return (
    <div className="">
      <ul className="mt-2 space-y-2">
        {ratings.map((rating) => (
          <li
            key={rating.id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              id={`rating-${rating.id}`}
              checked={selectedRating.includes(rating.value)}
              onChange={() => toggleRating(rating.value)}
              className="w-4 h-4 cursor-pointer"
            />
            {/* Stars and Label */}
            <label htmlFor={`rating-${rating.id}`} className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < rating.value ? "yellow" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-4 h-4 ${index < rating.value ? "text-yellow-200" : "text-gray-300"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-700">{rating.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFilter;
