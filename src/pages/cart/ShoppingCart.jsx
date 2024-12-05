import { FaCheckCircle } from "react-icons/fa";
import Stepper from "../../components/stepper/Stepper";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import VoucherApply from "../../components/voucher/VoucherApply";
import Navbar from "../../components/navbar/Navbar";
import ConfirmInfoPayment from "../../components/payment/ConfirmInfoPayment";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ClearCart,
  GetCarts,
  RemoveFromCart,
  UpdateCart,
} from "../../services/api/CartApi";
import BackToTop from "../../components/backToTop/BackToTop";
import authApi from "../../services/AxiosConfig";
import { fetchVariantDetails } from "../../services/api/ProductApi";
import { ToastContainer } from "react-toastify";

const ShoppingCart = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([]);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [variants, setVariants] = useState({});
  useEffect(() => {
    console.log("current step: ", currentStep);
  }, [currentStep]);

  useEffect(() => {
    // Fetch the cart items on component mount
    const fetchCart = async () => {
      try {
        const response = await GetCarts();
        setItems(response.items);

        // Fetch the variant details for each item
        const variantDetails = {};
        for (let item of response.items) {
          const variant = await fetchVariantDetails(item.variantId);
          variantDetails[item.variantId] = variant;
        }
        setVariants(variantDetails);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedItem = await UpdateCart({
        productId: id,
        quantity: newQuantity,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await RemoveFromCart(id); // Call API to remove item
      setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Remove from local state
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await ClearCart(); // Call API to clear cart
      setItems([]); // Clear the local cart state
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleApplyVoucher = (voucher) => {
    setAppliedVoucher(voucher);
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
  };

  return (
    <>
      <div className="w-full h-screen">
        <Navbar backgroundClass="bg-gray-100" />
        <BackToTop />
        {currentStep === 2 && (
          <>
            <div className="h-83v grid place-items-center bg-gray-900 text-gray-300 ">
              <div className="grid place-items-center">
                <FaCheckCircle className="text-[120px] text-emerald-500 " />
                <h1 className="text-4xl font-semibold">Payment Successful!</h1>
                <p className="text-lg mt-2">Thank you for your purchase.</p>
                <Link className="btn-add bg-emerald-500 mt-4" to="/">
                  Back to Shop
                </Link>
              </div>
            </div>
          </>
        )}
        <div className="bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {(currentStep === 0 || currentStep === 1) && (
              <>
                <h1 className="text-3xl font-bold text-white mb-8">
                  Shopping Cart
                </h1>
                <Stepper currentStep={currentStep} />
              </>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
              <div className="lg:col-span-2">
                {currentStep === 0 && (
                  <>
                    {items.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        variants={variants}
                        variant={variants[item.variantId]} // Pass the variant details
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                    {items.length === 0 && (
                      <div className="text-center py-8 text-gray-400 h-66v">
                        Your cart is empty
                      </div>
                    )}
                  </>
                )}
                {currentStep === 1 && <ConfirmInfoPayment />}
              </div>
              <div className="space-y-6">
                {currentStep === 0 && (
                  <>
                    <VoucherApply
                      onApply={handleApplyVoucher}
                      appliedVoucher={appliedVoucher}
                      onRemove={handleRemoveVoucher}
                    />
                    <CartSummary
                      items={items}
                      variants={variants}
                      discount={appliedVoucher?.discount}
                      discountPercentage={appliedVoucher?.discountPercentage}
                    />
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Clear Cart
                    </button>
                  </>
                )}
                {currentStep === 1 && (
                  <>
                    <CartSummary
                      items={items}
                      discount={appliedVoucher?.discount}
                      discountPercentage={appliedVoucher?.discountPercentage}
                      currentStep={currentStep}
                    />
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Confirm Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShoppingCart;
