import React from 'react'

const CartSummary = ({ currentStep, items, discount, discountPercentage }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = 0;
  const percentageDiscount = discountPercentage ? (subtotal * discountPercentage) / 100 : 0;
  const totalDiscount = (discount || 0) + percentageDiscount;
  const total = subtotal + tax + shipping - totalDiscount;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">Order Summary</h2>
      {currentStep === 1 && (
        <div className="space-y-3 mb-3 border-b border-gray-700 pb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-400">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <span>{(item.price * item.quantity)}$</span>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Subtotal</span>
          <span>{subtotal}$</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Tax (10%)</span>
          <span>{tax}$</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Shipping</span>
          <span>{shipping}$</span>
        </div>
        {(discount > 0 || percentageDiscount > 0) && (
          <div className="flex justify-between text-green-500">
            <span className="font-medium">Discount</span>
            <span>-{totalDiscount}$</span>
          </div>
        )}
        <div className="border-t :border-gray-700 pt-3">
          <div className="flex justify-between text-white font-bold">
            <span>Total</span>
            <span>{total}$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;