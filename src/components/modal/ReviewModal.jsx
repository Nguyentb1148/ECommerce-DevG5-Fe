import React, { useState } from "react";
import { FaX } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { createReview } from "../../services/api/ReviewApi"; // Adjust the path as necessary

const ReviewModal = ({ onClose, productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const maxChars = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (feedback.trim() === "") {
      toast.error("Please provide feedback");
      return;
    }

    try {
      const reviewData = {
        productId, // Use the actual product ID passed as a prop
        rating,
        comment: feedback,
      };
      await createReview(reviewData);
      toast.success("Review submitted successfully!");
      setRating(0);
      setFeedback("");
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Failed to submit review");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-opacity-20 bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white text-center">
            Product Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <FaX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-gray-300 text-sm font-medium"
              htmlFor="rating"
            >
              Rating
            </label>
            <div className="flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 rounded-full p-1"
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${ratingValue} stars out of 5`}
                  >
                    <FaStar
                      className="w-8 h-8 transition-colors duration-200"
                      color={
                        ratingValue <= (hover || rating) ? "#FBBF24" : "#4B5563"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-gray-300 text-sm font-medium"
              htmlFor="feedback"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={maxChars}
              rows="4"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
              placeholder="Share your thoughts about the product..."
              aria-label="Product feedback"
            />
            <div className="text-sm text-gray-400 text-right">
              {feedback.length}/{maxChars} characters
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white font-semibold rounded-lg px-4 py-3 transition-colors duration-200"
            aria-label="Submit review"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
