// import React, { useEffect, useState } from 'react';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import { getProductReviews } from "../../services/api/ReviewApi"; 

// const ProductReviews = ({ productId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await getProductReviews(productId);
//         console.log('Fetched reviews:', response); // Log the fetched reviews
//         setReviews(response);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, [productId]);

//   const RatingStars = ({ rating }) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<FaStar key={i} className="text-yellow-400" aria-label="full star" />);
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" aria-label="half star" />);
//       } else {
//         stars.push(<FaRegStar key={i} className="text-yellow-400" aria-label="empty star" />);
//       }
//     }
//     return (
//       <div className="flex items-center" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
//         {stars}
//         <span className="ml-2 text-gray-300">({rating})</span>
//       </div>
//     );
//   };

//   if (loading) return <p>Loading reviews...</p>;

//   return (
//     <div className=" py-8 px-4 sm:px-6 lg:px-8">
//       <div className="w-[90%] mx-auto">
//         <div className="mb-8 text-center">
//           <h2 className="text-lg sm:text-3xl font-semibold mb-4 text-white text-center4">Customer Reviews</h2>
//           <div className="flex justify-center items-center mb-2">
//             <RatingStars rating={reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length} />
//           </div>
//         </div>  
//         <div className="space-y-6 w-full">
//           {reviews.map((review) => (
//             <div
//               key={review._id}
//               className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="flex items-start space-x-4">
//                 <img
//                   src={review.userId.imageUrl}
//                   className="w-12 h-12 rounded-full object-cover"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-medium text-white">{review.userId.fullName}</h3>
//                     <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
//                   </div>
//                   <RatingStars rating={review.rating} />
//                   <p className="mt-2 text-gray-300">{review.comment}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductReviews;

import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { getProductReviews } from "../../services/api/ReviewApi";
import LoadingSpinner from '../loading/LoadingSpinner';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getProductReviews(productId);
        console.log('Fetched reviews:', response); // Log the fetched reviews
        setReviews(response);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const RatingStars = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" aria-label="full star" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" aria-label="half star" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" aria-label="empty star" />);
      }
    }
    return (
      <div className="flex items-center" role="img" aria-label={`Rating: ${rating} out of 5 stars`}>
        {stars}
        <span className="ml-2 text-gray-300">({rating})</span>
      </div>
    );
  };

  if (loading) return <div>
    <LoadingSpinner />
  </div>;

  return (
    <div>
      {/* Nếu không có review nào, hiển thị thông báo */}
      {reviews.length === 0 ? (
        <></>
      ) :
        (
          <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="sm:px-6 lg:px-8">
              <div className="w-full md:w-[90%] mx-auto">
                <div className="mb-8 text-center">
                  <h2 className="text-lg sm:text-3xl font-semibold mb-4 text-white text-center4">Customer Reviews</h2>
                  <div className="flex justify-center items-center mb-2">
                    <RatingStars rating={reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length} />
                  </div>
                  <p className="text-gray-300">{reviews.length} reviews</p>
                </div>
                <div className="space-y-6 w-full">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.userId.imageUrl}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">{review.userId.fullName}</h3>
                            <span className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                          <RatingStars rating={review.rating} />
                          <p className="mt-2 text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ProductReviews;
