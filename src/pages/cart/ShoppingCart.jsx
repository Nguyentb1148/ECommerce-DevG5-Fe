import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getCart, addToCart, removeFromCart, updateCartItem } from "../../services/api/Cart"; // Adjust paths
import Stepper from "../../components/stepper/Stepper";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import VoucherApply from "../../components/voucher/VoucherApply";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ConfirmInfoPayment from "../../components/payment/ConfirmInfoPayment";
import { Link } from "react-router-dom";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  

 
    // Lấy dữ liệu giỏ hàng từ localStorage
    useEffect(() => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng dưới 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    // Cập nhật lại localStorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };


  const handleApplyVoucher = (voucher) => setAppliedVoucher(voucher);

  const handleRemoveVoucher = () => setAppliedVoucher(null);

  return (
    <div className="w-full h-screen">
      <Navbar backgroundClass="bg-gray-100" />
      <Sidebar />
      {currentStep === 2 ? (
        <div className="h-83v grid place-items-center bg-gray-100 dark:bg-gray-900">
          <div className="grid place-items-center">
            <FaCheckCircle className="text-[120px] text-emerald-500" />
            <h1 className="text-4xl font-semibold">Payment Successful!</h1>
            <p className="text-lg mt-2">Thank you for your purchase.</p>
            <Link className="btn-add bg-emerald-500 mt-4" to="/">
              Back to Shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {(currentStep === 0 || currentStep === 1) && (
              <>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                  Shopping Cart
                </h1>
                <Stepper currentStep={currentStep} />
              </>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    Your cart is empty.
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <VoucherApply
                  onApply={handleApplyVoucher}
                  appliedVoucher={appliedVoucher}
                  onRemove={handleRemoveVoucher}
                />
                <CartSummary
                  items={cartItems}
                  discount={appliedVoucher?.discount}
                  discountPercentage={appliedVoucher?.discountPercentage}
                />
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
                >
                  {currentStep === 0 ? "Checkout" : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
