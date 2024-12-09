import React, { useEffect, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import mammoth from 'mammoth';

const ProductDetailModal = ({ product, onClose }) => {
  const [descriptionContent, setDescriptionContent] = useState(''); // State for description content
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Set loading to true when fetching starts
      if (product.description && product.description.startsWith('http')) {
        const response = await fetch(product.description);
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setDescriptionContent(result.value); // Set the HTML content from the Word document
          } catch (error) {
            console.error('Error converting .docx file:', error);
            setDescriptionContent('<p>Failed to load description content.</p>');
          }
        } else {
          console.error('Failed to fetch description content.');
          setDescriptionContent('<p>Failed to load description content.</p>');
        }
      } else {
        setDescriptionContent(product.description || '');
      }
      setLoading(false); // Set loading to false when fetching is done
    };

    if (product) {
      fetchProduct();
    }
  }, [product]);

  return (
    <div className="fixed inset-0 z-20 bg-opacity-30 bg-gray-900 p-6 text-white overflow-auto">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="space-y-6">
          {/* Product Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-center text-gray-100">Product Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
              <FaX />
            </button>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl w-36">Name:</h3>
            <p className="text-xl text-gray-400 px-2">{product.name}</p>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl w-36">Category:</h3>
            <p className="text-xl text-gray-400 px-2">{product.categoryId?.name}</p>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl w-36">Brand: </h3>
            <p className="text-lg text-gray-400 px-2">{product.brandId?.name}</p>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl w-36">Seller: </h3>
            <p className="text-lg text-gray-400 px-2">{product.sellerId?.fullName}</p>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <h3 className="text-2xl w-36">Price: </h3>
            <p className="text-lg text-gray-400 px-2">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </p>
          </div>

          {/* Image Gallery */}
          <h3 className="text-2xl w-36">Image: </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {product.imageUrls.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1590212151175-e58edd96185b';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <h3 className="text-2xl w-36">Description: </h3>
          {loading ? (
            <p className="text-gray-400">Loading description...</p>
          ) : (
            <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: descriptionContent }} />
          )}

          {/* Status and Rejection Reason */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-2">Status:</span>
              <span
                className={`px-3 py-1 text-white rounded-full text-sm font-medium capitalize 
                ${product.verify?.status === 'rejected' ? 'bg-red-500' : 'bg-green-500'}`}
              >
                {product.verify?.status}
              </span>
            </div>
            {product.verify?.status === 'rejected' && (
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Rejection Reason:</h3>
                <p className="text-gray-300">{product.verify?.feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
