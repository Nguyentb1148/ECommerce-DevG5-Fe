import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import paymentApi from "../../services/api/PaymentApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VnPayPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyVNPayPayment = async () => {
      try {
        setIsLoading(true);
        const queryParams = Object.fromEntries(searchParams.entries());
        const response = await paymentApi.verifyVnPayPayment(queryParams);
        setOrderDetails(response); // Store order details from response
      } catch (err) {
        setError("Payment verification failed. Please contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyVNPayPayment();
  }, [searchParams]);

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
        <h2 className="text-lg font-bold">Payment Summary</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <span className="font-semibold">Amount:</span>{" "}
            {searchParams.get("vnp_Amount")} VND
          </li>
          <li>
            <span className="font-semibold">Bank Code:</span>{" "}
            {searchParams.get("vnp_BankCode")}
          </li>
          <li>
            <span className="font-semibold">Transaction No:</span>{" "}
            {searchParams.get("vnp_TransactionNo")}
          </li>
          <li>
            <span className="font-semibold">Order Info:</span>{" "}
            {searchParams.get("vnp_OrderInfo")}
          </li>
          <li>
            <span className="font-semibold">Payment Date:</span>{" "}
            {searchParams.get("vnp_PayDate")}
          </li>
        </ul>
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

export default VnPayPaymentSuccess;
