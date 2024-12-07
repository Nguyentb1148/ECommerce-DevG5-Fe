const CartSummary = ({
  currentStep,
  items,
  variants = {},
  discount,
  discountPercentage,
}) => {
  // Defensive programming: check if items is empty
  if (!items || items.length === 0) {
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
      // Comprehensive price determination
      const itemPrice =
        variants[item.variantId]?.price || // Try variant price first
        item.product?.price || // Then try product price
        0; // Fallback to 0 if no price found

      const totalItemPrice = itemPrice * (item.count || 1);
      return acc + totalItemPrice;
    } catch (error) {
      console.error("Error calculating subtotal for item:", item, error);
      return acc;
    }
  }, 0);

  // Calculate Discount
  let totalDiscount = 0;
  if (discount) {
    totalDiscount = discount;
  } else if (discountPercentage) {
    totalDiscount = (subtotal * discountPercentage) / 100;
  }

  // Apply Tax (e.g., 10%)
  const tax = subtotal * 0.1; // 10% tax, you can adjust this as needed

  // Shipping cost (assumed to be a fixed cost for simplicity, can be dynamic)
  const shipping = 50000; // example shipping cost

  // Calculate Final Total
  const total = subtotal + tax + shipping - totalDiscount;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-2">Order Summary</h2>
      {currentStep === 1 && (
        <div className="space-y-3 mb-3 border-b border-gray-700 pb-4">
          {items.map((item) => {
            const variant = variants[item.variantId];
            console.log("------------->", variant);
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

      {/* Subtotal */}
      <div className="space-y-3">
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
          <span className="font-medium">Tax (10%)</span>
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
            }).format(shipping)}
          </span>
        </div>

        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-green-500">
            <span className="font-medium">Discount</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalDiscount)}
            </span>
          </div>
        )}

        <div className="border-t :border-gray-700 pt-3">
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
