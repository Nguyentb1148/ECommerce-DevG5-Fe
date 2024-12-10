import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item, variant, onUpdateQuantity, onRemove }) => {
  if (!variant) {
    return null; // If no variant is found, return nothing
  }
  const itemPrice = variant.price;
  const totalPrice = itemPrice * item.count;

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-gray-800 rounded-lg shadow-md">
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
        <div className="w-80">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {item.product.name}
          </h3>
          {/* <p className="text-gray-400">{itemPrice}VND</p> */}
          <p className="text-gray-400">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(itemPrice)}
          </p>
          <p className="text-gray-400 line-clamp-1">
            Storage: {variant.attributes?.option}, Color:{" "}
            {variant.attributes?.color}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() =>
              onUpdateQuantity(item.product._id, item.variantId, item.count - 1)
            }
            className="p-1 text-gray-400 hover:text-white"
            disabled={item.count <= 1}
          >
            <FiMinus />
          </button>
          <span className="text-white px-2">{item.count}</span>
          <button
            onClick={() =>
              onUpdateQuantity(item.product._id, item.variantId, item.count + 1)
            }
            className="p-1 text-gray-400 hover:text-white"
          >
            <FiPlus />
          </button>
        </div>
        <button
          onClick={() => onRemove(item.product._id, item.variantId)}
          className="text-red-500 hover:text-red-400"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
      <div className="text-white font-semibold mt-2">
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
