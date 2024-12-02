import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from "lucide-react"; // Import Trash2
import useVariantPermutation from '../../hooks/useVariantPermutation.tsx';

// Simple Button Component
const Button = ({ onClick, children, className, type = "primary" }) => {
    const styles = {
        primary: "bg-blue-400 text-white hover:bg-blue-500",
        secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
        danger: "bg-red-400 text-white hover:bg-red-500",
        ghost: "bg-transparent text-gray-700 hover:text-red-600",
        success:"bg-green-400 text-white hover:bg-green-500"
    };

    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 rounded transition ${styles[type]} ${className}`}
        >
            {children}
        </button>
    );
};

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

const VariantPage = ({ onSave }) => {
    const [options, setOptions] = useState([]);
    const [variants, setVariants] = useState([]);
    const [showDeleteAllAttributesModal, setShowDeleteAllAttributesModal] = useState(false);
    const [showDeleteAllVariantsModal, setShowDeleteAllVariantsModal] = useState(false);

    // Generate all variants using the custom hook
    const allVariants = useVariantPermutation(options.map((opt) => opt.tags));

    // Load options and variants from localStorage if they exist
    useEffect(() => {
        const savedOptions = localStorage.getItem('options');
        const savedVariants = localStorage.getItem('variants');

        if (savedOptions) {
            setOptions(JSON.parse(savedOptions));
        }

        if (savedVariants) {
            setVariants(JSON.parse(savedVariants));
        }
    }, []);
    useEffect(() => {
        // When variants are loaded, check if there is no options data and then map variant attributes to options.
        if (variants.length > 0 && options.length === 0) {
            const newOptions = [];

            variants.forEach(variant => {
                const optionValue = variant.attributes.option;

                if (optionValue) {
                    // Check if the option already exists in the options list
                    let optionIndex = newOptions.findIndex(opt => opt.title === optionValue);

                    if (optionIndex === -1) {
                        // Add new option if it doesn't exist
                        newOptions.push({
                            title: optionValue,  // 'option' value is now the title
                            tagInput: '',
                            tags: []
                        });
                        optionIndex = newOptions.length - 1;  // Get the index of the newly added option
                    }

                    // Loop through other attributes and add them as tags for this option
                    Object.entries(variant.attributes).forEach(([key, value]) => {
                        if (key !== 'option' && value && !newOptions[optionIndex].tags.includes(value)) {
                            // Add attribute value to tags
                            newOptions[optionIndex].tags.push(value);
                        }
                    });
                }
            });

            // Update options state with the newly created options
            setOptions(newOptions);
        }
    }, [variants, options.length]);



    // Save options and variants to localStorage when they change
    useEffect(() => {
        if (options.length > 0) {
            localStorage.setItem('options', JSON.stringify(options));
        }
    }, [options]);

    useEffect(() => {
        if (variants.length > 0) {
            localStorage.setItem('variants', JSON.stringify(variants));
        }
    }, [variants]);

    const handleAddOption = () => {
        setOptions([...options, { title: '', tagInput: '', tags: [] }]);
    };

    const handleRemoveOption = (indexToRemove) => {
        setOptions(options.filter((_, index) => index !== indexToRemove));
    };

    const handleTitleChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index].title = value;
        setOptions(newOptions);
    };

    const handleTagInputChange = (e, optionIndex) => {
        const newOptions = [...options];
        newOptions[optionIndex].tagInput = e.target.value;
        setOptions(newOptions);
    };

    const handleAddTag = (optionIndex) => {
        const tagValue = options[optionIndex].tagInput.trim();
        if (!tagValue) return;

        const newOptions = [...options];
        if (!newOptions[optionIndex].tags.includes(tagValue)) {
            newOptions[optionIndex].tags.push(tagValue);
            newOptions[optionIndex].tagInput = ''; // Clear input after adding the tag
            setOptions(newOptions);
        }
    };

    const handleCreateVariants = () => {
        setVariants(allVariants.map((variant) => ({
            attributes: variant.reduce((acc, value, index) => {
                acc[options[index].title] = value;
                return acc;
            }, {}),
            price: '',
            stockQuantity: ''
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
                    attributeMapping[option.title] = variant.attributes[option.title];
                });

                return {
                    attributes: attributeMapping,
                    price: variant.price,
                    stockQuantity: variant.stockQuantity,
                };
            })
        );
        // Debugging the data to be saved
        console.log("Saving data:", { attributes, variants: processedVariants });
        // Saving to parent component via onSave
        onSave({ attributes, variants: processedVariants });
    };

    const handleDeleteAllAttributes = () => {
        setOptions([]);
        localStorage.setItem('options', JSON.stringify([])); // Clear options in localStorage
        setShowDeleteAllAttributesModal(false);
    };

    const handleDeleteAllVariants = () => {
        setVariants([]);
        localStorage.setItem('variants', JSON.stringify([])); // Clear variants in localStorage
        setShowDeleteAllVariantsModal(false);
    };

    return (
        <div className="w-[1300px] h-[650px] mx-auto p-6 flex">
            {/* Left Section for Attribute Options */}
            <div className="w-1/2 pr-4 space-y-6 p-4 overflow-auto h-full">
                <h2 className="text-2xl font-bold mb-6">Product Options</h2>

                {/* Create Option Button */}
                <div className="flex gap-4">
                    <Button
                        onClick={handleAddOption}
                        type="primary"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create Attribute
                    </Button>

                    {/* Delete All Attributes Button */}
                    <Button
                        onClick={() => setShowDeleteAllAttributesModal(true)}
                        type="danger"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete All Attributes
                    </Button>
                </div>

                {/* Render all options */}
                <div className="space-y-4 mt-4">
                    {options.map((option, optionIndex) => (
                        <Card key={optionIndex} className="border border-gray-300 p-4">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">
                                            Attribute<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            value={option.title}
                                            onChange={(e) => handleTitleChange(optionIndex, e.target.value)}
                                            placeholder="Enter option title"
                                            className="max-w-xs"
                                        />
                                    </div>

                                    {/* Tags and Input to add tags */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Value <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {option.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white text-black border border-gray-300"
                                                >
                                                    {tag}
                                                    <button
                                                        onClick={() => handleRemoveTag(optionIndex, tag)}
                                                        className="text-black hover:text-red-500"
                                                    >
                                                        <X className="h-4 w-4"/>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={option.tagInput}
                                                onChange={(e) => handleTagInputChange(e, optionIndex)}
                                                placeholder="Type and press Enter to add tags"
                                                className="max-w-xs"
                                            />
                                            <Button
                                                onClick={() => handleAddTag(optionIndex)}
                                                type="success"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => handleRemoveOption(optionIndex)}
                                    type="danger"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right Section for Variants */}
            <div className="w-1/2 pl-4 space-y-6 p-4 overflow-auto h-full">
                <h2 className="text-2xl font-bold mb-6">Variants</h2>

                {/* Create Variants Button */}
                <div className="flex gap-4">
                    <Button
                        onClick={handleCreateVariants}
                        type="primary"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create Variants
                    </Button>

                    {/* Delete All Variants Button */}
                    <Button
                        onClick={() => setShowDeleteAllVariantsModal(true)}
                        type="danger"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete All Variants
                    </Button>
                </div>

                <div className="space-y-4 mt-4">
                    {variants.map((variant, variantIndex) => (
                        <Card key={variantIndex} className="border border-gray-300 p-4">
                            <div className="flex justify-between items-start relative">
                                {/* Variant Details */}
                                <div className="w-full">
                                    {/* Attributes Section */}
                                    <div className="mb-4">
                                        <span className="font-semibold block mb-2">Attributes:</span>
                                        <div className="space-y-1">
                                            {Object.entries(variant.attributes).map(([key, value]) => (
                                                <div key={key} className="text-sm">
                                                    <span className="font-medium">{key}:</span> {value}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price and Quantity Section */}
                                    <div className="flex gap-4 mb-4">
                                        {/* Price */}
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-1">
                                                Price<span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                value={variant.price}
                                                onChange={(e) =>
                                                    handleVariantChange(variantIndex, 'price', e.target.value)
                                                }
                                                placeholder="Enter price"
                                                className="w-full"
                                            />
                                        </div>
                                        {/* Quantity */}
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-1">
                                                Quantity<span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                value={variant.stockQuantity}
                                                onChange={(e) =>
                                                    handleVariantChange(variantIndex, 'stockQuantity', e.target.value)
                                                }
                                                placeholder="Enter quantity"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Remove Variant Button */}
                                <Button
                                    onClick={() => handleRemoveVariant(variantIndex)}
                                    type="danger"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <X className="h-4 w-4" />
                                </Button>

                            </div>
                        </Card>
                    ))}
                </div>

                <Button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white hover:bg-blue-500"
                >
                    Save
                </Button>
            </div>

            {/* Delete All Attributes Modal */}
            {showDeleteAllAttributesModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete all attributes?</h3>
                        <div className="flex justify-end space-x-4">
                            <Button onClick={() => setShowDeleteAllAttributesModal(false)} type="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteAllAttributes} type="danger">
                                Delete All
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete All Variants Modal */}
            {showDeleteAllVariantsModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete all variants?</h3>
                        <div className="flex justify-end space-x-4">
                            <Button onClick={() => setShowDeleteAllVariantsModal(false)} type="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteAllVariants} type="danger">
                                Delete All
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VariantPage;
