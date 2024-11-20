import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaVenusMars } from 'react-icons/fa';
import ImageLogo from "../assets/robot-assistant.png";
import ImageLogoGoogle from "../assets/LogoGoogle.png";

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  return (
    <div
      className={`relative w-[70%] mx-auto mt-24 bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-[1500ms] ${isSignUpMode
        ? "h-[730px] sm:h-[500px] md:h-[500px]"
        : "h-[500px]"
        }`}
    >

      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center transition-transform duration-[1500ms] ease-in-out z-30">
        <div
          className={`signin-signup absolute transform w-full transition-all duration-[1500ms] ease-in-out ${isSignUpMode ? 'top-[15%] left-[50%] md:left-[50%] translate-x-[-50%]' : 'top-[5%] left-[50%] md:left-[25%] md:translate-x-0 translate-x-[-50%] scale-75 md:scale-100'
            }`}
        >
          {/* Vùng chứa các nút chuyển đổi */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-10 z-50">
            {/* Button Sign up */}
            <button
              className={`absolute top-[500px] right-[24%] md:left-[490px] bg-white text-black border-2 border-gray-300 w-[105px] h-[35px] font-bold text-[0.9rem] cursor-pointer rounded-full hover:bg-gray-900 hover:text-white hover:bg-opacity-100 transition-all duration-200 ${isSignUpMode ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                } md:top-[280px] md:right-[24%] md:left-[500px] left-[50%] transform translate-x-[-50%] md:translate-x-0 md:top-[250px]`}
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
            <button
              className={`absolute top-[110px] sm:top-[130px] md:top-[280px] right-[24%] md:left-[210px] bg-white text-black border-2 border-gray-300 w-[105px] h-[35px] font-bold text-[0.9rem] cursor-pointer rounded-full hover:bg-gray-900 hover:text-white hover:bg-opacity-100 transition-all duration-200 ${isSignUpMode ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } md:right-[24%] md:left-[220px] left-[50%] transform translate-x-[-50%] md:translate-x-0 md:top-[250px]`}
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <form
            className={`sign-in-form absolute flex items-center justify-center flex-col py-0 px-4 sm:px-6 md:px-20 left-[50%] sm:left-[60%] md:left-[-42%] w-[90%] sm:w-[80%] md:w-[450px] transition-all duration-[1500ms] lg:left-[-25%] ease-in-out scale-75 ${isSignUpMode
                ? "translate-y-full md:translate-x-full opacity-0 z-10 pointer-events-none"
                : "translate-y-[-50px] sm:translate-y-[-100px] md:translate-y-[50px] opacity-100 z-40 pointer-events-auto translate-x-[-50%] sm:translate-x-[-30%] md:translate-x-0"
              }`}
          >
            <h2 className="text-2xl text-gray-700 mb-4">Sign In</h2>

            {/* Email Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px] mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                id="signin_email"
                className="block pl-10 pb-2.5 pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signin_email"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px] mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                id="signin_password"
                className="block pl-10 pb-2.5 pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signin_password"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>

            {/* Forget Password Link */}
            <div className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px] mb-4 text-right">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline focus:outline-none focus:text-blue-800"
                onClick={() => alert('Forget Password functionality goes here!')}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[150px] bg-gray-800 border-none outline-none h-[49px] rounded-full text-xs md:text-sm text-white font-semibold my-2 cursor-pointer transition duration-500 hover:bg-gray-700 sm:w-[120px] sm:h-[40px] sm:text-xs"
            >
              Login
            </button>

            {/* Line with "or" */}
            <div className="relative flex items-center w-full my-4 -top-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login with Google */}
            <div className="mt-[-10px] left-[15px] flex justify-center items-center">
              <button
                type="button"
                className="flex items-center justify-center w-[240px] h-[49px] bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 sm:w-[200px] sm:h-[40px]"
              >
                <img
                  src={ImageLogoGoogle}
                  alt="Google Logo"
                  className="w-5 h-5 mr-3"
                />
                <span className="text-sm font-medium">Login with Google</span>
              </button>
            </div>
          </form>


          {/* Form Sign up */}
          <form
            className={`sign-up-form absolute flex items-center justify-center flex-col py-0 px-4 sm:px-6 md:px-20 left-[50%] md:left-[55%] w-[90%] sm:w-[80%] md:w-[450px] transition-all duration-[1500ms] ease-in-out ${isSignUpMode
              ? "mt-12 sm:mt-12 md:mt-[-50px] translate-y-[200px] sm:translate-y-[250px] md:translate-y-0 translate-x-[-50%] md:translate-x-0 opacity-100 z-40 pointer-events-auto"
              : "mt-[-50px] md:mt-[-50px] -translate-y-full md:-translate-x-full opacity-0 z-10 pointer-events-none translate-x-[-50%] md:translate-x-0"
              }`}
          >
            <h2 className="text-2xl text-gray-700 mb-2">Sign Up</h2>

            {/* Email Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] mb-3 md:mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                id="signup_email"
                className="block pl-10 pb-2 pt-4 md:pb-2.5 md:pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signup_email"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-3 md:top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>

            {/* Fullname Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] mb-3 md:mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <input
                type="text"
                id="signup_fullname"
                className="block pl-10 pb-2 pt-4 md:pb-2.5 md:pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signup_fullname"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-3 md:top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Fullname
              </label>
            </div>

            {/* Gender Select */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] mb-3 md:mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaVenusMars className="text-gray-500" />
              </div>
              <select
                id="signup_gender"
                className="block pl-10 pb-2 pt-4 md:pb-2.5 md:pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <label
                htmlFor="signup_gender"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-3 md:top-4 bg-white dark:bg-gray-800 px-1 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Gender
              </label>
            </div>

            {/* Password Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] mb-3 md:mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                id="signup_password"
                className="block pl-10 pb-2 pt-4 md:pb-2.5 md:pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signup_password"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-3 md:top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>

            {/* Password Input */}
            <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[480px] mb-3 md:mb-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                id="signup_password"
                className="block pl-10 pb-2 pt-4 md:pb-2.5 md:pt-5 w-full text-xs md:text-sm text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="signup_password"
                className="absolute text-xs md:text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 top-3 md:top-4 bg-white dark:bg-gray-800 px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600"
              >
                Confirm Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[120px] md:w-[150px] bg-gray-800 border-none outline-none h-[40px] md:h-[49px] rounded-full text-xs md:text-sm text-white font-semibold my-2 cursor-pointer transition duration-500 hover:bg-gray-700"
            >
              Register
            </button>
          </form>


        </div>
      </div>
      <div className="absolute h-full w-full top-0 left-0 grid grid-cols-1 md:grid-cols-2">
        {/* Panel bên trái */}
        <div
          className={`left-panel flex flex-col items-center justify-center text-center transition-all duration-[1500ms] ease-in-out bg-gray-800 ${isSignUpMode
              ? "h-[300px] sm:h-[350px] md:h-full opacity-100 pointer-events-auto"
              : "h-full opacity-0 pointer-events-none"
            }`}
        >
          <h2 className="text-white text-[30px] mb-4">Dev5G</h2>
          <img src={ImageLogo} alt="Logo" className="w-[80px] h-[80px] mb-2" />
        </div>

        {/* Panel bên phải */}
        <div
          className={`right-panel flex flex-col items-center justify-center text-center ${isSignUpMode ? "h-[calc(100vh-500px)] md:h-full" : "h-full"
            } bg-gray-800 transition-all duration-[1500ms] ease-in-out transform ${isSignUpMode ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
            }`}
        >
          <h2 className="text-white text-[30px] relative top-[-40px] left-[0px] md:left-[15px] mb-2">Dev5G</h2>
          <img src={ImageLogo} alt="" className="w-[80px] h-[80px] relative top-[-40px] left-[0px] md:left-[15px] mb-2" />
        </div>
      </div>
    </div>
  );
}

export default Login;