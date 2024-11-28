import React from 'react'
import { FaShoppingCart, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const Stepper = ({ currentStep }) => {
    const steps = [
        { icon: <FaShoppingCart />, label: "Cart" },
        { icon: <FaCreditCard />, label: "Payment" },
        { icon: <FaCheckCircle />, label: "Review" }
    ];

    return (
        <div className="flex justify-center my-4">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full 
                ${index <= currentStep ? "bg-blue-600" : "dark:bg-gray-700 bg-gray-200"} ${index === currentStep ? "ring-2 ring-blue-400" : ""}`}
                    >
                        <span className={`${index <= currentStep ? "text-white" : "text-gray-500"}`}>{step.icon}</span>
                    </div>
                    <span className={`mx-2 text-sm ${index <= currentStep ? "text-gray-800 dark:text-white" : "text-gray-500"}`}>
                        {step.label}
                    </span>
                    {index < steps.length - 1 && (
                        <div className={`w-8 md:w-20 h-1 mr-4 ${index < currentStep ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-700"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Stepper