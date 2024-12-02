import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const InputPassword = ({
  id,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  togglePassword,
}) => {
  return (
    <div>
      <div className="mt-1 relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <FaLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-2 border rounded-lg bg-opacity-20 bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            error ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
          required
          aria-label={placeholder}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <FaEyeSlash className="h-5 w-5 text-gray-400" />
          ) : (
            <FaEye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputPassword;
