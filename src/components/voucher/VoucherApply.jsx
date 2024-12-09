import { useEffect, useState } from "react";
import { BsTag, BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { getCoupons } from "../../services/api/CouponApi";

const VoucherApply = ({ onApply, appliedVoucher, onRemove }) => {
  const [showVoucherList, setShowVoucherList] = useState(false);
  const [availableVouchers, setAvailableVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showVoucherList) {
      const fetchVouchers = async () => {
        try {
          setLoading(true);
          setError(null); // Reset errors
          const vouchers = await getCoupons(); // Fetch from API
          console.log("coupon", vouchers);
          setAvailableVouchers(vouchers);
        } catch (err) {
          setError("Failed to load vouchers. Please try again.");
          toast.error("Error loading vouchers.");
        } finally {
          setLoading(false);
        }
      };

      fetchVouchers();
    }
  }, [showVoucherList]);

  const handleApply = (voucher) => {
    onApply(voucher);
    setShowVoucherList(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Voucher Code</h3>
        {!appliedVoucher && (
          <button
            onClick={() => setShowVoucherList(!showVoucherList)}
            className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
          >
            <BsTag size={24} />
          </button>
        )}
      </div>
      {appliedVoucher ? (
        <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
          <div>
            <p className="text-white font-medium">{appliedVoucher.code}</p>
            <p className="text-gray-400 text-sm">
              {appliedVoucher.description}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-400"
          >
            <BsX size={24} />
          </button>
        </div>
      ) : showVoucherList ? (
        loading ? (
          <div className="text-white">Loading vouchers...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="space-y-2">
            {availableVouchers.map((voucher) => (
              <div
                key={voucher.code}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{voucher.code}</p>
                  <p className="text-gray-400 text-sm">{voucher.description}</p>
                </div>
                <button
                  onClick={() => handleApply(voucher)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export default VoucherApply;
