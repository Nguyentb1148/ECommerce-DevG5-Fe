import React from "react";
import { FaCcStripe, FaCreditCard } from "react-icons/fa";

const PaymentOptions = ({ selectedPayment, setSelectedPayment }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4 dark:text-white ">Payment Method</h2>
    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={() => setSelectedPayment("stripe")}
        className={`flex items-center justify-center p-4 rounded-lg border-2 dark:text-white  ${selectedPayment === "stripe" ? "border-blue-500 dark:bg-blue-900 bg-blue-50" : "border-gray-300 dark:bg-gray-800 dark:border-gray-600"} transition duration-200`}
        aria-label="Select Stripe Payment"
      >
        <FaCcStripe className="text-4xl mr-2" />
        <span>Stripe</span>
      </button>
      <button
        onClick={() => setSelectedPayment("vnpay")}
        className={`flex items-center justify-center p-4 rounded-lg border-2 dark:text-white  ${selectedPayment === "vnpay" ? "border-blue-500 dark:bg-blue-900 bg-blue-50" : "border-gray-300 dark:bg-gray-800 dark:border-gray-600" } transition duration-200`}
        aria-label="Select VNPay Payment"
      >
        <FaCreditCard className="text-4xl mr-2" />
        <span>VNPay</span>
      </button>
    </div>
  </div>
);

export default PaymentOptions;
