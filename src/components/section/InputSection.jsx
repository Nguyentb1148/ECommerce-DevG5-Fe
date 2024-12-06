import React from 'react'

const InputSection = ({ label, name, value, onChange, onBlur, error, placeholder }) => {
    return (
        <div className="mb-3">
            <label
                htmlFor={name}
                className="block text-gray-400 text-sm font-bold mb-2"
            >
                {label} <span className="text-red-500 ml-1">*</span>
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
                aria-label={label}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default InputSection