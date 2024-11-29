import { useState, useEffect } from 'react';
import { X, Plus } from "lucide-react"; // Import X instead of Trash2
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

const VariantPage = ({ onSave }) => {
    const [options, setOptions] = useState([]);
    const [variants, setVariants] = useState([]);

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
            attributes: variant,
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
                    attributeMapping[option.title] = variant.attributes[index];
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

    return (
        <div className="w-[1300px] h-[650px] mx-auto p-6 flex">
            {/* Left Section for Attribute Options */}
            <div className="w-1/2 pr-4 space-y-6  p-4">
                <h2 className="text-2xl font-bold mb-6">Product Options</h2>

                {/* Create Option Button */}
                <Button
                    onClick={handleAddOption}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white hover:bg-blue-500"
                >
                    <Plus className="h-4 w-4" />
                    Create Attribute
                </Button>

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
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={option.tagInput}
                                                onChange={(e) => handleTagInputChange(e, optionIndex)}
                                                placeholder="Type and press Enter to add tags"
                                                className="max-w-xs"
                                            />
                                            <Button
                                                onClick={() => handleAddTag(optionIndex)}
                                                className="flex items-center justify-center gap-2 bg-blue-400 text-white hover:bg-blue-500"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveOption(optionIndex)}
                                    className="text-slate-500 hover:text-red-600"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right Section for Variants */}
            <div className="w-1/2 pl-4 space-y-6  p-4">
                <h2 className="text-2xl font-bold mb-6">Variants</h2>

                {/* Create Variants Button */}
                <Button
                    onClick={handleCreateVariants}
                    className="w-full flex items-center justify-center gap-2 bg-blue-400 text-white hover:bg-blue-500"
                >
                    <Plus className="h-4 w-4" />
                    Create Variants
                </Button>

                <div className="space-y-4 mt-4">
                    {variants.map((variant, variantIndex) => (
                        <Card key={variantIndex} className="border border-gray-300 p-4">
                            <div className="flex justify-between items-start relative">
                                <div>
                                    <div className="mb-2">
                                        <span className="font-semibold">Attributes:</span>{' '}
                                        {variant.attributes.join(', ')}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium mb-1">
                                            Price<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            value={variant.price}
                                            onChange={(e) =>
                                                handleVariantChange(variantIndex, 'price', e.target.value)
                                            }
                                            placeholder="Enter price"
                                            className="max-w-xs"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-sm font-medium mb-1">
                                            Quantity<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            value={variant.stockQuantity}
                                            onChange={(e) =>
                                                handleVariantChange(variantIndex, 'stockQuantity', e.target.value)
                                            }
                                            placeholder="Enter quantity"
                                            className="max-w-xs"
                                        />
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveVariant(variantIndex)}
                                    className="absolute top-0 right-0 text-slate-500 hover:text-red-600"
                                >
                                    <X className="h-5 w-5" />
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
        </div>
    );
};

export default VariantPage;
