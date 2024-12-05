import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  // Calculate the price for the item based on quantity
  const totalItemPrice = item.product.price * item.count;

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.imageUrls[0]}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-md"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = item.product.imageUrls;
          }}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {item.product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            ${item.product.price.toFixed(2)} each
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.count - 1)}
            className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            disabled={item.count <= 1}
          >
            <FiMinus />
          </button>
          <span className="text-gray-800 dark:text-white px-2">
            {item.count}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.count + 1)}
            className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <FiPlus />
          </button>
        </div>
        <button
          onClick={() => onRemove(item.product._id)}
          className=" text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
      <div className="text-gray-800 dark:text-white">
        <p>Total: ${totalItemPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
