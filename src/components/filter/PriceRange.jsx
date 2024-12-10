import { Range } from "react-range";

const PriceRange = ({ priceRange = [3000000, 100000000], setPriceRange }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);

  // Ensure priceRange values are within bounds
  const validPriceRange = [
    Math.max(priceRange[0], 3000000),
    Math.min(priceRange[1], 100000000),
  ];

  return (
    <div className="">
      <h3 className="font-semibold text-lg">Price Range</h3>
      <div className="flex justify-between items-center my-2">
        <span className="text-sm font-medium">
          Min: {formatCurrency(validPriceRange[0])}
        </span>
        <span className="text-sm font-medium">
          Max: {formatCurrency(validPriceRange[1])}
        </span>
      </div>

      <Range
        step={1000000} // Step: 1,000,000 VND
        min={3000000} // Min: 3,000,000 VND
        max={100000000} // Max: 10,000,000,000 VND
        values={validPriceRange}
        onChange={(values) => setPriceRange(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-200 rounded-lg relative"
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                background: "limegreen",
                borderRadius: "4px",
                left: `${
                  ((validPriceRange[0] - 3000000) / (100000000 - 3000000)) * 100
                }%`,
                width: `${
                  ((validPriceRange[1] - validPriceRange[0]) /
                    (100000000 - 3000000)) *
                  100
                }%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 bg-white border-2 border-limegreen rounded-full shadow-lg"
          />
        )}
      />
    </div>
  );
};

export default PriceRange;
