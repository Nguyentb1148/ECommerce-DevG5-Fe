import { useEffect, useState } from "react";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";
import { requestStatus, requestUserToSeller } from "../../services/api/RequestApi.jsx";

const UserRoleUpdate = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requestState, setRequestState] = useState(null); // To hold the current request status
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching request status

  useEffect(() => {
    const fetchRequestStatus = async () => {
      try {
        setIsLoading(true); // Start loading
        const res = await requestStatus();
        setRequestState(res[0]); // Update state with fetched status
        console.log("Result:", res[0].result);
        console.log("Request Status:", res);
      } catch (error) {
        console.error("Error fetching request status:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchRequestStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
        const dataToSend = {
          type: "user",
          targetId: user?.id,
          title: "Request user to seller role",
          reason: formData.identifier,
        };
        console.log("Data sent:", dataToSend);

        const response = await requestUserToSeller(dataToSend);
        console.log("API Response:", response);

        setIsProcessing(false);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error sending request:", error);
        setIsProcessing(false);
      }
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center p-8">
          <FaSpinner className="h-16 w-16 text-indigo-500 animate-spin" />
          <p className="ml-4 text-indigo-400 font-medium">Loading...</p>
        </div>
    );
  }

  if (requestState) {
    if (requestState.result === "pending") {
      return (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <FaSpinner className="h-16 w-16 text-yellow-500 animate-spin mx-auto" />
            <h2 className="text-3xl font-bold text-yellow-400 mt-4">Request Pending</h2>
            <p className="text-gray-300 mt-2">
              Your request to update your role is currently under review. Please wait for further updates.
            </p>
          </div>
      );
    }

    if (requestState.result === "rejected") {
      return (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <FaTimesCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h2 className="text-3xl font-bold text-red-400 mt-4">Request Rejected</h2>
            <p className="text-gray-300 mt-2">
              Your request to update your role was rejected. Reason:{" "}
              <span className="font-semibold text-red-300">{requestState.feedback || "No reason provided"}</span>.
            </p>
            <ul className="mt-4">
              <li>
                <button
                    onClick={() => setRequestState(null)} // Reset the request state to show the form again
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
                >
                  Create New Request
                </button>
              </li>
            </ul>
          </div>
      );
    }

  }

  return (
      <div className="flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 p-8 rounded-xl">
          {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <FaCheckCircle className="h-16 w-16 text-green-500" />
                  <h2 className="mt-6 text-3xl font-bold text-white">Success!</h2>
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
                  <h2 className="text-3xl font-extrabold text-white">Role Update Request</h2>
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
                      className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors ${
                          formData.termsAccepted && !isProcessing
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "bg-gray-600 cursor-not-allowed"
                      }`}
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
};

export default UserRoleUpdate;