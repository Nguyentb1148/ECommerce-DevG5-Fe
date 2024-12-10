import React from "react";

const CartSummary = ({
  currentStep,
  items = [],
  variants = {},
  discount = 0,
  taxRate = 0.1, // Default 10% tax
  shippingCost = 50000, // Default shipping cost
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-white mb-2">Order Summary</h2>
        <p className="text-gray-400">No items in cart</p>
      </div>
    );
  }

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => {
    try {
      const itemPrice =
        variants[item.variantId]?.price || item.product?.price || 0; // Fallback to 0 if no price found
      return acc + itemPrice * (item.count || 1);
    } catch (error) {
      console.error("Error calculating price for item:", item, error);
      return acc;
    }
  }, 0);

  // Calculate Discount
  const totalDiscount = (subtotal * discount) / 100;

  // Calculate Tax and Total
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost - totalDiscount;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">Order Summary</h2>

      {currentStep === 1 && (
        <div className="space-y-3 mb-3 border-b border-gray-700 pb-4">
          {items.map((item) => {
            const itemPrice =
              variants[item.variantId]?.price || item.product?.price || 0;
            const totalItemPrice = itemPrice * (item.count || 1);
            return (
              <div
                key={item._id}
                className="flex justify-between text-gray-400"
              >
                <div>
                  <p className="font-medium">
                    {item.product?.name || "Unknown Product"}
                  </p>
                  <p className="text-sm">Quantity: {item.count || 0}</p>
                </div>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalItemPrice)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Subtotal</span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(subtotal)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">
            Tax ({(taxRate * 100).toFixed(0)}%)
          </span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(tax)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Shipping</span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(shippingCost)}
          </span>
        </div>

        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-green-500">
            <span className="font-medium">Discount</span>
            {
              <span>
                {" "}
                -
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalDiscount)}
              </span>
            }
          </div>
        )}

        {/* Total */}
        <div className="border-t border-gray-700 pt-3">
          <div className="flex justify-between text-white font-bold">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
