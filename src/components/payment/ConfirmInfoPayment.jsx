import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PaymentOptions from "../payment/PaymentOption";
import tinhThanhData from "../../data/tinh_tp.json"; // Import city data
import { BiErrorCircle } from "react-icons/bi"; // For error icon

const ConfirmInfoPayment = ({
  deliveryAddress,
  setDeliveryAddress,
  setIsFormValid,
  selectedPayment,
  setSelectedPayment,
}) => {
  const [touchedFields, setTouchedFields] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [city, setCity] = useState({});
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});

  // Set city data on mount
  useEffect(() => {
    setCity(tinhThanhData);
    console.log("City data loaded:", tinhThanhData);
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse data from localStorage
    if (user && user.fullName) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName,
      }));
    }
  }, []);
  const handlePaymentSelection = (paymentMethod) => {
    console.log("Payment option selected:", paymentMethod); // Log selected payment method
    setSelectedPayment(paymentMethod);
  };

  // Handle city selection and load corresponding district data
  const handleCityChange = async (event) => {
    const selectedCityCode = event.target.value;
    const selectedCity = city[selectedCityCode]; // Get the full city object
    setFormData((prev) => ({
      ...prev,
      city: selectedCity, // Save the full city object
    }));
    console.log("Selected city:", selectedCity);
    try {
      const selectedDistrictData = await import(
        `../../data/quan-huyen/${selectedCityCode}.json`
      );
      setDistrict(selectedDistrictData.default);
    } catch (err) {
      console.error("Error loading district data:", err);
      setDistrict([]);
    }
  };

  // Handle district selection and load corresponding ward data
  const handleDistrictChange = async (event) => {
    const selectedDistrictCode = event.target.value;
    const selectedDistrict = district[selectedDistrictCode]; // Get the full district object

    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict, // Save the full district object
    }));

    console.log("Selected district:", selectedDistrict);

    try {
      const selectedWardData = await import(
        `../../data/xa-phuong/${selectedDistrictCode}.json`
      );
      setWard(selectedWardData.default);
    } catch (e) {
      console.error(
        "Error loading ward data for district:",
        selectedDistrictCode
      );
      setWard([]);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // If the input is for ward, find the corresponding ward object
    if (name === "ward") {
      const selectedWard = ward[value]; // Find the selected ward from the ward data
      setFormData((prev) => {
        const updatedFormData = {
          ...prev,
          ward: selectedWard, // Save the full ward object
        };
        // Update combined address
        const combinedAddress = `${updatedFormData.address}, ${
          updatedFormData.ward?.name_with_type || ""
        }, ${updatedFormData.district?.name_with_type || ""}, ${
          updatedFormData.city?.name_with_type || ""
        }`;
        setDeliveryAddress(combinedAddress.trim());
        console.log(combinedAddress);
        return updatedFormData;
      });
    } else {
      // For address or other fields, update them normally
      setFormData((prev) => {
        const updatedFormData = { ...prev, [name]: value };

        // Update combined address
        const combinedAddress = `${updatedFormData.address}, ${
          updatedFormData.ward?.name_with_type || ""
        }, ${updatedFormData.district?.name_with_type || ""}, ${
          updatedFormData.city?.name_with_type || ""
        }`;
        setDeliveryAddress(combinedAddress.trim());
        console.log(combinedAddress);
        return updatedFormData;
      });
    }
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullname = "Full Name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.ward) newErrors.ward = "Ward is required";
    if (!formData.address) newErrors.address = "Address is required";

    const filteredErrors = Object.keys(newErrors)
      .filter((key) => touchedFields[key])
      .reduce((acc, key) => {
        acc[key] = newErrors[key];
        return acc;
      }, {});

    setErrors(filteredErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  useEffect(() => {
    const isValid = validateForm(); // Validate the form on changes
    setIsFormValid(isValid); // Update the form validity state
  }, [formData, touchedFields, setIsFormValid]); // Include `setIsFormValid` to avoid stale closures

  return (
    <div className="bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Shipping Information UI */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="fullName" // Corrected name
                value={formData.fullName} // Ensure it uses formData.fullName
                onChange={handleInputChange}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${
                  errors.fullName ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter your full name"
              />
              {errors.name && <ErrorMessage message={errors.name} />}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-400"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={formData.city?.code || ""}
                onChange={handleCityChange}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${
                  errors.city ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select City</option>
                {Object.values(city).map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name_with_type} {/* Display the name here */}
                  </option>
                ))}
              </select>
              {errors.city && <ErrorMessage message={errors.city} />}
            </div>
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-400"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district?.code || ""}
                onChange={handleDistrictChange}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${
                  errors.district ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select District</option>
                {Object.values(district).map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name_with_type} {/* Display the name here */}
                  </option>
                ))}
              </select>
              {errors.district && <ErrorMessage message={errors.district} />}
            </div>
            <div>
              <label
                htmlFor="ward"
                className="block text-sm font-medium text-gray-400"
              >
                Ward
              </label>
              <select
                id="ward"
                name="ward"
                value={formData.ward?.code || ""}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${
                  errors.ward ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select Ward</option>
                {Object.values(ward).map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name_with_type} {/* Display the name here */}
                  </option>
                ))}
              </select>
              {errors.ward && <ErrorMessage message={errors.ward} />}
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-400"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${
                  errors.address ? "border-red-500" : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter your address"
              />
              {errors.address && <ErrorMessage message={errors.address} />}
            </div>
          </div>
        </div>

        <PaymentOptions
          selectedPayment={selectedPayment}
          setSelectedPayment={handlePaymentSelection} // Pass the correct function
        />
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm mt-1 flex items-center">
    <BiErrorCircle className="mr-1" /> {message}
  </p>
);

ConfirmInfoPayment.propTypes = {
  deliveryAddress: PropTypes.string.isRequired,
  setDeliveryAddress: PropTypes.func.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  selectedPayment: PropTypes.func.isRequired,
};

export default ConfirmInfoPayment;
