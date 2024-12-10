import React, { useState, useRef } from 'react';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';

const AttributeSection = ({
                              formData,
                              setFormData,
                              errors,
                              attributeInputValues,
                              setAttributeInputValues,
                              handleAttributeInputChange,
                              addValueToAttribute,
                              removeAttribute,
                              removeValueFromAttribute,
                              addAttribute,
                              isEdit
                          }) => {
    const [typingTimeouts, setTypingTimeouts] = useState({}); // Store timeouts for each attribute
    const previousNamesRef = useRef({}); // Store previous names for comparison

    return (
        <div className="mb-3">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-100">Attribute</h3>
                {/* Conditionally hide the "Add Attribute" button if attributes already exist */}
                {!isEdit && (
                    <button
                        type="button"
                        onClick={addAttribute}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
                    >
                        <FiPlus className="mr-2" /> Add Attribute
                    </button>
                )}
            </div>
            {formData.attributes.map((attribute, attributeIndex) => (
                <div key={attributeIndex} className=" mb-2 ">
                    <div className="flex items-center">
                        <span className="text-white px-2">{attributeIndex + 1}</span>
                        <div className="w-full p-4 border border-gray-700 rounded-lg">
                            <div className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Attribute Name (e.g., Color)"
                                    value={attribute.name || ''}
                                    onChange={(e) => {
                                        const newAttributes = [...formData.attributes];
                                        const newName = e.target.value.trim();
                                        newAttributes[attributeIndex].name = newName;
                                        setFormData({ ...formData, attributes: newAttributes });

                                        // Clear previous timeout for this attribute
                                        if (typingTimeouts[attributeIndex]) {
                                            clearTimeout(typingTimeouts[attributeIndex]);
                                        }

                                        // Set a new timeout for logging after typing stops
                                        const timeout = setTimeout(() => {
                                            const oldName = previousNamesRef.current[attributeIndex] || '';
                                            if (oldName !== newName) {
                                                console.log(`Attribute name changed at index ${attributeIndex}:`, {
                                                    oldName,
                                                    newName,
                                                });
                                                previousNamesRef.current[attributeIndex] = newName; // Update previous name
                                            }
                                        }, 500); // Adjust delay as needed

                                        setTypingTimeouts({
                                            ...typingTimeouts,
                                            [attributeIndex]: timeout,
                                        });
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent form submission
                                            const newName = formData.attributes[attributeIndex].name;
                                            const oldName = previousNamesRef.current[attributeIndex] || '';
                                            if (oldName !== newName) {
                                                console.log(`New attribute name set at index ${attributeIndex}:`, newName);
                                                previousNamesRef.current[attributeIndex] = newName; // Update previous name
                                            }
                                        }
                                    }}
                                    className="w-48 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeAttribute(attributeIndex)}
                                    className="p-2 text-red-400 hover:text-red-300"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {attribute.values.map((value, valueIndex) => (
                                    <span
                                        key={valueIndex}
                                        className="inline-flex items-center px-3 py-1 bg-indigo-900 text-indigo-100 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-800"
                                    >
                    {value}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                console.log(`Removing value at index ${valueIndex} from attribute ${attribute.name}:`, value);
                                                removeValueFromAttribute(attributeIndex, valueIndex);
                                            }}
                                            className="ml-2 text-indigo-300 hover:text-indigo-200 focus:outline-none"
                                        >
                      <FiX size={14} />
                    </button>
                  </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add new value"
                                    value={attributeInputValues[attributeIndex] || ''}
                                    onChange={(e) =>
                                        handleAttributeInputChange(attributeIndex, e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            console.log(`Adding value to attribute ${attribute.name}:`, attributeInputValues[attributeIndex]);
                                            addValueToAttribute(attributeIndex);
                                        }
                                    }}
                                    className="w-44 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log(`Adding value to attribute ${attribute.name}:`, attributeInputValues[attributeIndex]);
                                        addValueToAttribute(attributeIndex);
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {errors.attributes && (
                <p className="text-red-500 text-xs mt-1">{errors.attributes}</p>
            )}
        </div>
    );
};

export default AttributeSection;
