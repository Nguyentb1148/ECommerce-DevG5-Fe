import { useState } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
const UserRoleUpdate = () => {
    const [formData, setFormData] = useState({
        identifier: "",
        termsAccepted: false
      });
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [isProcessing, setIsProcessing] = useState(false);
    
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value
        }));
        
        if (errors[name]) {
          setErrors(prev => ({
            ...prev,
            [name]: ""
          }));
        }
      };
    
      const validateForm = () => {
        const newErrors = {};
        if (!formData.identifier.trim()) {
          newErrors.identifier = "Reason is required";
        }
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = "You must accept the terms and conditions";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setIsProcessing(true);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          setIsProcessing(false);
          setIsSubmitted(true);
        }
      };
      return (
        <div className=" flex items-center justify-center px-4 ">
          <div className="max-w-md w-full space-y-8  p-8 rounded-xl ">
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <FaCheckCircle className="h-16 w-16 text-green-500 " />
                  <h2 className="mt-6 text-3xl font-bold text-white">
                    Success!
                  </h2>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Role Update Request Submitted
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Your request to update your role to Seller has been received and is being processed.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <p className="text-green-400 text-sm">
                    We will notify you once your request has been reviewed.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-white">
                    Role Update Request
                  </h2>
                  <p className="mt-2 text-gray-300">
                    Request to update your role to
                    <span className="text-indigo-400 font-semibold"> Seller</span>
                  </p>
                </div>
    
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="identifier"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Reason
                    </label>
                    <textarea
                      id="identifier"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Enter your reason"
                    />
                    {errors.identifier && (
                      <p className="mt-2 text-sm text-red-400">{errors.identifier}</p>
                    )}
                  </div>
    
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="termsAccepted"
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-300 cursor-pointer"
                      >
                        I agree to the
                        <button
                          type="button"
                          className="ml-1 text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
                        >
                          Terms and Conditions
                        </button>
                      </label>
                      {errors.termsAccepted && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.termsAccepted}
                        </p>
                      )}
                    </div>
                  </div>
    
                  <button
                    type="submit"
                    disabled={!formData.termsAccepted || isProcessing}
                    className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors ${formData.termsAccepted && !isProcessing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-600 cursor-not-allowed"}`}
                  >
                    {isProcessing ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Request Role Update"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      );
}

export default UserRoleUpdate