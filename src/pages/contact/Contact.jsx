import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "../../components/navbar/Navbar";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "general",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const mapContainerStyle = {
    width: "100%",
    height: "400px"
  };
  const center = {
    lat: 16.0511946024293,
    lng: 108.24256453438865
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      if (!validateEmail(value) && value !== "") {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", purpose: "general", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };
  return (
    <div className="bg-gray-900">
    <Navbar />
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-300">We'd love to hear from you!</p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-200"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-200 ${
                    emailError ? "border-red-500" : "border-gray-700"
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-400">{emailError}</p>
                )}
              </div>
  
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-300">
                  Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-200"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales</option>
                  <option value="other">Other</option>
                </select>
              </div>
  
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-200"
                ></textarea>
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {loading ? (
                  <FaSpinner className="animate-spin h-5 w-5" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
  
          {/* Company Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Company Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="h-6 w-6 text-primary" />
                  <span className="ml-3 text-gray-300">+84 69696969</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="h-6 w-6 text-primary" />
                  <span className="ml-3 text-gray-300">devshop@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-6 w-6 text-primary" />
                  <span className="ml-3 text-gray-300">116-118 Mai Thúc Lân</span>
                </div>
              </div>
            </div>
  
            {/* Map */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Location</h2>
              <div className="rounded-lg overflow-hidden">
                <LoadScript googleMapsApiKey="AIzaSyDpU-bVU9PYn8EI8wCbjqUgwJ9v2DqaCVc">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={14}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <p className="mt-4 text-gray-300">
                Visit our store located in the heart of Da Nang City. We're easily accessible by public transportation and offer parking facilities for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};
export default Contact;