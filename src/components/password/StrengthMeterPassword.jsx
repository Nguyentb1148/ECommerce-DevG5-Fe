import React from "react";

const StrengthMeterPassword = ({ password }) => {
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ["Weak", "Medium", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full rounded-full ${
              index < strength ? strengthColors[strength - 1] : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-1">
        Password Strength:{" "}
        {strength > 0 ? strengthLabels[strength - 1] : "None"}
      </p>
    </div>
  );
};

export default StrengthMeterPassword;
