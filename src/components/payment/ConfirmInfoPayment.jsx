import { useState } from "react";
import ShippingInformation from "../shipping/ShippingInformation";
import PaymentOptions from "../payment/PaymentOption";
// import PaymentCardForm from "../payment/PaymentCardForm";
const ConfirmInfoPayment = (
  deliveryAddress,
  setDeliveryAddress,
  handleConfirmPayment
) => {
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [formData, setFormData] = useState({
    fullname: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const city = ["Đà Nẵng", "Hue", "Ha Noi", "Ho Chi Minh"];
  const district = ["Thanh Khê"];
  const ward = [
    "An Khê",
    "Chính Gián",
    "Hòa Khê",
    "Tam Thuận",
    "Vĩnh Trung",
    "Xuân Hà",
    "Tân Chính",
    "Thạc Gián",
    "Thanh Khê Đông",
    "Thanh Khê Tây",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "address") setDeliveryAddress(value); // Sync with parent
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.ward) newErrors.ward = "Ward is required";
    if (!formData.address) newErrors.address = "Address is required";
    // if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    // if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    // if (!formData.cvv) newErrors.cvv = "CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (typeof handleConfirmPayment === "function") {
        handleConfirmPayment(selectedPayment);
      } else {
        console.error("handleConfirmPayment is not a function");
      }
    }
  };

  return (
    <div className="bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <ShippingInformation
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            city={city}
            district={district}
            ward={ward}
          />
          <PaymentOptions
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          {/* <PaymentCardForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          /> */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            Confirm Payment with {selectedPayment}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmInfoPayment;
