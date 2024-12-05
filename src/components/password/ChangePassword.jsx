import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { updateUserProfile } from "../../services/api/UserApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to calculate password strength
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  // Get strength label and color based on the score
  const getStrengthLabelAndColor = (strength) => {
    const labels = ["Weak", "Medium", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    // Ensure that the strength is at least 1 to avoid undefined values
    const index = Math.max(strength - 1, 0); // Use 0 as a fallback if strength is 0
    return { label: labels[index], color: colors[index] };
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const feedbackMessages = validatePassword(newPassword);

    if (feedbackMessages.length > 0) {
      setError("Please strengthen your password.");
      setFeedback(feedbackMessages);
      setSuccessMessage("");
      return;
    }
    if (currentPassword === newPassword) {
      // setError("The current password must be different from the old password.");
      toast.error(
        "The current password must be different from the old password."
      );
      setSuccessMessage("");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password must match!");
      setSuccessMessage("");
      return;
    }

    setError("");
    setFeedback([]);
    setLoading(true);

    const updatePassword = { currentPassword, newPassword };

    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log("🚀 ~ handlePasswordSubmit ~ userData:", userData);
        
        // Check for user.id or user._id
        const user = userData._id || userData.id;
        console.log("user id:", user);
        
        if (!user || !userData) { // Checking if user or userData is undefined or null
          setError("User not found!");
          setSuccessMessage("");
          setLoading(false);
          return;
        }
           
      try {
        const response = await updateUserProfile(user.id, updatePassword);

        // Debugging: Check response structure and message
        console.log("Response object: ", response);
        console.log("Response message: ", response.message);

        // Strip spaces, handle lowercase, and ensure exact matching
        const normalizedMessage = response.message?.trim().toLowerCase();
        console.log("Normalized message: ", normalizedMessage);

        // Condition to check if the response message is correct
        if (normalizedMessage === "user updated successfully") {
          console.log("Password update successful, showing success toast");
          setError(""); // Reset any error messages
          toast.success("Password updated successfully!", {
            style: {
              color: "green",
              backgroundColor: "#eafaf1",
              border: "1px solid green",
            },
            position: "top-center", // Directly using the string value
          });
        } else {
          console.error("Unexpected response message:", response.message);
          setError("Failed to update password.");
          setSuccessMessage("");
          toast.error("Failed to update password.");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        toast.error(error.response.data.error);
      }
    } catch (error) {
      setError(
        "An error occurred while updating your password. Please try again."
      );
      setSuccessMessage("");

      toast.error(
        "An error occurred while updating your password. Please try again."
      );
    } finally {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    const strength = calculateStrength(password);
    return strength;
  };

  // Validate password
  const validatePassword = (password) => {
    const feedbackMessages = [];

    if (password.length < 8) {
      feedbackMessages.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      feedbackMessages.push("Add at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      feedbackMessages.push("Add at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      feedbackMessages.push("Add at least one number.");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      feedbackMessages.push("Add at least one special character.");
    }

    return feedbackMessages;
  };

  // Get the current password strength
  const strength = checkPasswordStrength(newPassword);
  const { label, color } = getStrengthLabelAndColor(strength);
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-6 max-w-md mx-auto"
      >
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Current Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm rounded-md border-gray-600 bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-300"
          >
            New Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm rounded-md border-gray-600 bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mt-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-full rounded-full ${
                    index < strength ? color : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Password Strength: {strength > 0 ? label : "None"}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Confirm New Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm rounded-md border-gray-600 bg-gray-700 text-white"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {feedback.length > 0 && (
          <ul className="text-yellow-500 text-sm">
            {feedback.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        )}

        {/* {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )} */}

        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
