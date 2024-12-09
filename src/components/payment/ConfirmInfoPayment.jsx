import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShippingInformation from "../shipping/ShippingInformation";
import PaymentOptions from "../payment/PaymentOption";

const ConfirmInfoPayment = ({
  deliveryAddress,
  setDeliveryAddress,
  setIsFormValid,
  selectedPayment, // Use props
  setSelectedPayment, // Use props
}) => {
  const [touchedFields, setTouchedFields] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    city: "",
    district: "",
    ward: "",
    address: "",
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

    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      const combinedAddress = `${updatedFormData.fullname}, ${updatedFormData.address}, ${updatedFormData.ward}, ${updatedFormData.district}, ${updatedFormData.city}`;
      setDeliveryAddress(combinedAddress.trim());
      return updatedFormData;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Always validate all fields but show errors only for touched ones
    if (!formData.fullname) newErrors.fullname = "Full Name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.ward) newErrors.ward = "Ward is required";
    if (!formData.address) newErrors.address = "Address is required";

    // Only show errors for touched fields
    const filteredErrors = Object.keys(newErrors)
      .filter((key) => touchedFields[key])
      .reduce((acc, key) => {
        acc[key] = newErrors[key];
        return acc;
      }, {});

    setErrors(filteredErrors); // Update the errors state
    console.log("error count", Object.keys(newErrors).length);
    return Object.keys(newErrors).length === 1; // Form is valid if no errors
  };

  useEffect(() => {
    const isValid = validateForm(); // Validate the form on changes
    setIsFormValid(isValid); // Update the form validity state
  }, [formData, touchedFields, setIsFormValid]); // Include `setIsFormValid` to avoid stale closures

  return (
    <div className="bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};

ConfirmInfoPayment.propTypes = {
  deliveryAddress: PropTypes.string.isRequired,
  setDeliveryAddress: PropTypes.func.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
};

export default ConfirmInfoPayment;
