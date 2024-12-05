import React, { useState } from "react";
import ShippingInformation from "../shipping/ShippingInformation";
import PaymentOptions from "../payment/PaymentOption";
import PaymentCardForm from "../payment/PaymentCardForm";
const ConfirmInfoPayment = () => {
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
  const city = ["Đà Nẵng"];
  const district = ["Thanh Khê"];
  const ward = ["An Khê", "Chính Gián", "Hòa Khê", "Tam Thuận", "Vĩnh Trung","Xuân Hà", "Tân Chính", "Thạc Gián", "Thanh Khê Đông", "Thanh Khê Tây"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.cỉty) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.ward) newErrors.ward = "Ward is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Payment confirmed!", formData);
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
          <PaymentOptions selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
          <PaymentCardForm formData={formData} handleInputChange={handleInputChange} errors={errors} />

        </form>
      </div>
    </div>
  );
}

export default ConfirmInfoPayment