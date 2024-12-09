import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import ForgotPassword from "../../components/password/ForgotPassword";
import AnimatedBackground from "../../components/background/AnimatedBackGround";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  forgotPassword,
  googleSignIn,
  login,
  register,
} from "../../services/Api/AuthApi";

const clientId =
  "671407638676-nc6tsp0nscas88kneq1jt9q3itl2l6h8.apps.googleusercontent.com";

// 2. Then the rest of your code
const AuthForm = () => {
  const [formType, setFormType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    return /^[a-zA-Z\s]+$/.test(fullName) && fullName.length >= 5;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
    if (name === "fullName" && !validateFullName(value)) {
      newErrors.fullName = "Full Name must be at least 5 characters long";
    } else {
      delete newErrors.fullName;
    }

    if (name === "email" && !validateEmail(value)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      delete newErrors.email;
    }

    if (name === "password" && !validatePassword(value)) {
      newErrors.password = "Password must be at least 8 characters long";
    } else {
      delete newErrors.password;
    }

    if (name === "confirmPassword" && value !== registerData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formType === "login") {
      try {
        const response = await login(loginData);
        const decoded = jwtDecode(response.token.accessToken);
        console.log(decoded);
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
      } catch (error) {
        // toast.error("Login failed! Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (formType === "register") {
      try {
        if (registerData.password !== registerData.confirmPassword) {
          setErrors({ ...errors, confirmPassword: "Passwords do not match" });
          return;
        }
        const { confirmPassword, ...dataToSend } = registerData;
        const response = await register(dataToSend);
        if (response) {
          navigate("/");
        }
        setFormType("login");
      } catch (error) {
        // toast.error("Something went wrong! Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (formType === "forgot") {
      try {
        await forgotPassword(forgotData.email);
        toast.success("Please check your email to reset password!");
      } catch (error) {
        // toast.error("Failed to send password reset email.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("decoded from google", decoded);
    const { email, picture, name } = decoded;

    try {
      // Attempt login or registration via Google
      const res = await googleSignIn(email, name, picture);

      const decodedToken = jwtDecode(res.accessToken);
      localStorage.setItem("user", JSON.stringify(decodedToken));
      localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
      Cookies.set("refreshToken", res.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      if (decodedToken.role === "admin") {
        navigate("/admin");
      } else if (decodedToken.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/");
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed via Google!");
      console.error(error);
    }
  };

  const handleLoginFailure = (response) => {
    console.log("Login failed:", response);
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
                disabled={loading}
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
          <div className="py-2"></div>
          {formType === "login" && (
            <div className="py-2">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginFailure}
                  scope="profile email"
                  disabled={loading}
                />
              </GoogleOAuthProvider>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
