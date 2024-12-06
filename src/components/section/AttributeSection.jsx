import React from 'react'
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
}) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-100">Attribute</h3>
        <button
          type="button"
          onClick={addAttribute}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
        >
          <FiPlus className="mr-2" /> Add Attribute
        </button>
      </div>
      {formData.attributes.map((attribute, attributeIndex) => (
        <div
          key={attributeIndex}
          className=" mb-2 "
        >
          <div className="flex items-center">
            <span className="text-white px-2">{attributeIndex + 1}</span>
            <div className="w-full p-4 border border-gray-700 rounded-lg">
              <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Attribute Name (e.g., Color)"
                    value={attribute.name || ""}
                    onChange={(e) => {
                      const newAttributes = [...formData.attributes];
                      newAttributes[attributeIndex].name = e.target.value.trim();
                      setFormData({...formData, attributes: newAttributes});
                    }}
                    className="w-48 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                />

                <button
                    type="button"
                    onClick={() => removeAttribute(attributeIndex)}
                    className="p-2 text-red-400 hover:text-red-300"
                >
                  <FiTrash2 size={20}/>
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
                          onClick={() =>
                        removeValueFromAttribute(attributeIndex, valueIndex)
                      }
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
                  value={attributeInputValues[attributeIndex] || ""}
                  onChange={(e) =>
                    handleAttributeInputChange(attributeIndex, e.target.value)
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addValueToAttribute(attributeIndex);
                    }
                  }}
                  className="w-44 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => addValueToAttribute(attributeIndex)}
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
}

export default AttributeSection;