import React, { useState } from 'react';
import { X, Plus, Trash2 } from "lucide-react";
import useVariantPermutation from '../../hooks/useVariantPermutation.tsx';

// Simple Button Component
const Button = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 bg-red-400 text-white rounded hover:bg-red-500 transition ${className}`}
    >
        {children}
    </button>
);
// Simple Card Component
const Card = ({ children, className }) => (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
        {children}
    </div>
);
// Simple Input Component
const Input = ({ value, onChange, placeholder, className, onKeyDown }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 border border-gray-300 rounded-lg ${className}`}
        onKeyDown={onKeyDown}
    />
);

const VariantPage = ({onSave}) => {
    const [options, setOptions] = useState([]);
    const [variants, setVariants] = useState([]);

    // Generate all variants using the custom hook
    const allVariants = useVariantPermutation(options.map((opt) => opt.tags));

    const handleAddOption = () => {
        setOptions([...options, { title: '', tags: [], tagInput: '' }]);
    };

    const handleRemoveOption = (indexToRemove) => {
        setOptions(options.filter((_, index) => index !== indexToRemove));
    };

    const handleTitleChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].title = value;
        setOptions(newOptions);
    };

    const handleAddTag = (optionIndex, tagValue) => {
        if (!tagValue.trim()) return;

        const newOptions = [...options];
        if (!newOptions[optionIndex].tags.includes(tagValue.trim())) {
            newOptions[optionIndex].tags.push(tagValue.trim());
            newOptions[optionIndex].tagInput = ''; // Clear input after adding the tag
            setOptions(newOptions);
        }
    };

    const handleRemoveTag = (optionIndex, tagToRemove) => {
        const newOptions = [...options];
        newOptions[optionIndex].tags = newOptions[optionIndex].tags.filter(
            tag => tag !== tagToRemove
        );
        setOptions(newOptions);
    };

    const handleTagInputChange = (e, optionIndex) => {
        const newOptions = [...options];
        newOptions[optionIndex].tagInput = e.target.value;
        setOptions(newOptions);
    };

    const handleTagInputKeyDown = (e, optionIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputValue = e.target.value;
            handleAddTag(optionIndex, inputValue);
        }
    };

    const handleCreateVariants = () => {
        setVariants(allVariants.map((variant) => ({
            attributes: variant,
            price: '',
            stockQuantity: '' // Ensure stockQuantity is initialized here
        })));
    };


    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };


    const handleRemoveVariant = (indexToRemove) => {
        setVariants(variants.filter((_, index) => index !== indexToRemove));
    };



    const handleSave = async () => {
        const attributes = options.reduce((acc, option) => {
            acc[option.title] = option.tags;
            return acc;
        }, {});

        const processedVariants = await Promise.all(
            variants.map(async (variant) => {

                const attributeMapping = {};
                options.forEach((option, index) => {
                    attributeMapping[option.title] = variant.attributes[index];
                });

                return {
                    attributes: attributeMapping,
                    price: variant.price,
                    stockQuantity: variant.stockQuantity, // Include stock in save logic
                };
            })
        );

        onSave({ attributes, variants: processedVariants }); // Pass the data back to the parent
    };



    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Options</h2>

            {/* Options Section */}
            <div className="space-y-4">
                {options.map((option, optionIndex) => (
                    <Card key={optionIndex} className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="w-full">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Option title<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        value={option.title}
                                        onChange={(e) => handleTitleChange(optionIndex, e.target.value)}
                                        placeholder="Enter option title"
                                        className="max-w-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tags (comma separated)
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {option.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-slate-900 text-white"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => handleRemoveTag(optionIndex, tag)}
                                                    className="text-white hover:text-red-300"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <Input
                                        value={option.tagInput} // Bind to the tagInput value in state
                                        onChange={(e) => handleTagInputChange(e, optionIndex)} // Update the input state
                                        placeholder="Type and press Enter to add tags"
                                        onKeyDown={(e) => handleTagInputKeyDown(e, optionIndex)} // Handle key press
                                        className="max-w-xs"
                                    />
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveOption(optionIndex)}
                                className="text-slate-500 hover:text-red-600"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </Card>
                ))}

                <Button
                    onClick={handleAddOption}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add an option
                </Button>
            </div>

            {/* Create Variants Section */}
            <Button
                onClick={handleCreateVariants}
                className="mt-4 w-full flex items-center justify-center gap-2"
            >
                Create Variants
            </Button>

            {/* Variants Section */}
            <div className="space-y-4 mt-6">
                {variants.map((variant, variantIndex) => (
                    <Card key={variantIndex} className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="mb-2">
                                    <span className="font-semibold">Attributes:</span>{' '}
                                    {variant.attributes.join(', ')}
                                </div>
                                <Input
                                    value={variant.price}
                                    onChange={(e) =>
                                        handleVariantChange(variantIndex, 'price', e.target.value)
                                    }
                                    placeholder="Enter price"
                                    className="max-w-xs"
                                />
                                <Input
                                    value={variant.stockQuantity}
                                    onChange={(e) => handleVariantChange(variantIndex, 'stockQuantity', e.target.value)}
                                    placeholder="Enter stockQuantity"
                                    className="max-w-xs mt-2"
                                />
                            </div>
                            <Button
                                onClick={() => handleRemoveVariant(variantIndex)}
                                className="text-slate-500 hover:text-red-600"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Save Button */}
            <Button
                onClick={handleSave}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
            >
                Save Variants
            </Button>
        </div>
    );
};

export default VariantPage;
