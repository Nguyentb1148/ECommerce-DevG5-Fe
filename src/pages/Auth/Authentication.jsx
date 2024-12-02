import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "../../components/background/Login";
import Register from "../../components/background/Register";
import ForgotPassword from "../../components/background/ForgotPassword";
import AnimatedBackground from "../../components/background/AnimatedBackGround";
import authApi from "../../services/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; //
import { login, register } from "../../services/Api/AuthApi";

const AuthForm = () => {
  const [formType, setFormType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Separate state for each form type
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotData, setForgotData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const validatePassword = (password) => password.length >= 8;
  const validateFullName = (fullName) => {
    return /^[a-zA-Z\s]+$/.test(fullName) && fullName.length >= 5; // Only letters and spaces, at least 3 characters
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on formType
    switch (formType) {
      case "login":
        setLoginData({ ...loginData, [name]: value });
        break;
      case "register":
        setRegisterData({ ...registerData, [name]: value });
        break;
      case "forgot":
        setForgotData({ ...forgotData, [name]: value });
        break;
      default:
        break;
    }

    const newErrors = { ...errors };

    // Validate input based on form type
    if (name === "fullName") {
      if (!validateFullName(value)) {
        newErrors.fullName = "Full Name must be at least 5 characters long";
      } else {
        delete newErrors.fullName; // Only delete error if valid
      }
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email; // Only delete error if valid
      }
    }

    if (name === "password") {
      if (!validatePassword(value)) {
        newErrors.password = "Password must be at least 8 characters long";
      } else {
        delete newErrors.password; // Only delete error if valid
      }
    }

    if (name === "confirmPassword") {
      if (value !== registerData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword; // Only delete error if valid
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formType === "login") {
      try {
        // Call login API
        const response = await login(loginData);
        const decoded = jwtDecode(response.token.accessToken);
        localStorage.setItem("user", JSON.stringify(decoded));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.token.accessToken)
        );
        Cookies.set("refreshToken", response.token.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        if (decoded.role === "admin") {
          navigate("/admin");
        } else if (decoded.role === "seller") {
          navigate("/seller");
        } else {
          navigate("/");
        }
        toast.success("Login successful!");
        // Redirect or do other actions on successful login
      } finally {
        setLoading(false); // Reset loading state after request
      }
    } else if (formType === "register") {
      try {
        // Call register API
        if (registerData.password !== registerData.confirmPassword) {
          setErrors({ ...errors, confirmPassword: "Passwords do not match" });
          return;
        }
        // Remove confirmPassword before sending the request
        const { confirmPassword, ...dataToSend } = registerData;
        // Call register API
        const response = await register(dataToSend);
        if (response) {
          navigate("/");
        }
        setFormType("login"); // Switch to login form after successful registration
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      } finally {
        setLoading(false); // Reset loading state after the request completes
      }
    }
  };

  const getFormTitle = () => {
    switch (formType) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Create Account";
      case "forgot":
        return "Forgot Password";
      default:
        return "";
    }
  };

  const getFormSubtitle = () => {
    switch (formType) {
      case "login":
        return "Please sign in to continue";
      case "register":
        return "Please fill in the information below";
      case "forgot":
        return "Enter your email to reset your password";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-900 items-center justify-center p-4">
      <AnimatedBackground />
      <div className="max-w-md w-full fixed z-20 bg-gray-800/30 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">{getFormTitle()}</h2>
            <p className="text-gray-300 mt-2">{getFormSubtitle()}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={formType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              {formType === "login" && (
                <Login
                  formData={loginData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  setFormType={setFormType}
                />
              )}

              {formType === "register" && (
                <Register
                  formData={registerData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              )}

              {formType === "forgot" && (
                <ForgotPassword
                  formData={forgotData}
                  errors={errors}
                  handleInputChange={handleInputChange}
                />
              )}

              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-tl from-gray-900 to-slate-800 text-white py-2 rounded-lg hover:opacity-80 transition-opacity duration-300"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="border-t-2 border-b-2 border-white rounded-full w-6 h-6 animate-spin mr-2"></div>
                    Loading...
                  </div>
                ) : formType === "login" ? (
                  "Sign In"
                ) : formType === "register" ? (
                  "Sign Up"
                ) : (
                  "Send"
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-6 text-center">
            {formType === "forgot" ? (
              <button
                onClick={() => setFormType("login")}
                className="text-purple-600 hover:text-purple-500 transition-colors duration-300"
              >
                Back to Sign In
              </button>
            ) : (
              <button
                onClick={() =>
                  setFormType(formType === "login" ? "register" : "login")
                }
                className="text-purple-600 hover:text-purple-500 transition-colors duration-300"
              >
                {formType === "login"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
