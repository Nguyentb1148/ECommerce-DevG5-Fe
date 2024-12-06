import React from 'react'
import { FiTrash2 } from 'react-icons/fi';

const VariantSection = ({ formData, setFormData, errors, removeVariant }) => {
    return (
        <>
            {formData.variants.length > 0 && (
                <div className="mb-3">
                    <h3 className="text-lg font-medium mb-4 text-gray-100">Variants</h3>
                    <div className="space-y-4">
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-white px-2">{index + 1}</span>
                                <div className="w-full p-4 bg-gray-750 border border-gray-700 rounded-lg">
                                    <div className="md:flex md:justify-between gap-3">
                                        <div className="max-md:mb-4 flex flex-wrap gap-2">
                                            {variant.attributeDetails.map((detail, detailIndex) => (
                                                <span
                                                    key={detailIndex}
                                                    className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-sm"
                                                >
                                                    <span className="font-medium text-indigo-400">
                                                        {detail.name}:
                                                    </span>
                                                    <span className="ml-2">{detail.value}</span>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={variant.price}
                                                onChange={(e) => {
                                                    const newVariants = [...formData.variants];
                                                    newVariants[index].price = e.target.value;
                                                    setFormData({ ...formData, variants: newVariants });
                                                }}
                                                className="w-20 px-2 md:w-28 md:px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400 appearance-none"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                value={variant.quantity}
                                                onChange={(e) => {
                                                    const newVariants = [...formData.variants];
                                                    newVariants[index].quantity = e.target.value;
                                                    setFormData({ ...formData, variants: newVariants });
                                                }}
                                                className="w-20 px-2 md:w-28 md:px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="p-2 text-red-400 hover:text-red-300 focus:outline-none ml-auto"
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors.variants && (
                        <p className="text-red-500 text-xs mt-1">{errors.variants}</p>
                    )}
                </div>
            )}
        </>
    )
}

export default VariantSection;