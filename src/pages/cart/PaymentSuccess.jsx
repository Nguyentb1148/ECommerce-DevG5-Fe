import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import paymentApi from "../../services/api/PaymentApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // Order details
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setError("Invalid payment session. Redirecting...");
        setTimeout(() => navigate("/shoppingCart"), 3000); // Redirect to cart after 3 seconds
        return;
      }

      try {
        // Verify payment and fetch order details
        const response = await paymentApi.verifyPayment(sessionId);
        setOrder(response.order);
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError("Payment verification failed. Please contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Verifying payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-red-500">
        <FaTimesCircle size={80} />
        <h1 className="text-3xl font-bold mt-4">Payment Failed</h1>
        <p className="mt-2">{error}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/shoppingCart")}
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <FaCheckCircle size={80} className="text-green-500" />
      <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
      <p className="mt-2">
        Thank you for your purchase. Your order has been confirmed.
      </p>
      <div className="mt-6 bg-gray-800 p-4 rounded-lg w-3/4 max-w-2xl">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <ul className="mt-4 space-y-2">
          {order.orderItems.map((item) => (
            <li key={item.productId} className="flex justify-between">
              <span>
                {item.quantity}x {item.productName}
              </span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="flex justify-between">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </p>
          {order.discountAmount > 0 && (
            <p className="flex justify-between text-green-400">
              <span>Discount:</span>
              <span>-${order.discountAmount.toFixed(2)}</span>
            </p>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Delivery Address: {order.deliveryAddress}
        </p>
      </div>
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate("/")}
      >
        Back to Shop
      </button>
    </div>
  );
};

export default PaymentSuccess;
