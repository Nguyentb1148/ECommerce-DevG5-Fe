import React from 'react'

const SelectSection = ({ label, name, value, onChange, options, error, placeholder }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-gray-400 text-sm font-bold mb-2"
            >
                {label} <span className="text-red-500 ml-1">*</span>
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={label}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default SelectSection