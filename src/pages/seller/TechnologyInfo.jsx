import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa6";

const TechnologyInfo = ({ onSave }) => {
    const [techInfo, setTechInfo] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [inputs, setInputs] = useState({});

    const addSection = () => {
        if (newTitle.trim() !== '') {
            setTechInfo([{ title: newTitle, details: [] }, ...techInfo]);
            setNewTitle('');
        }
    };

    const addDetail = (sectionIndex) => {
        const detailName = inputs[`detailName-${sectionIndex}`] || '';
        if (detailName.trim() !== '') {
            const updatedInfo = [...techInfo];
            updatedInfo[sectionIndex].details = [
                { name: detailName, values: [] },
                ...updatedInfo[sectionIndex].details,
            ];
            setTechInfo(updatedInfo);
            setInputs((prev) => ({ ...prev, [`detailName-${sectionIndex}`]: '' }));
        }
    };

    const addValueToDetail = (sectionIndex, detailIndex) => {
        const value = inputs[`value-${sectionIndex}-${detailIndex}`] || '';
        if (value.trim() !== '') {
            const updatedInfo = [...techInfo];
            updatedInfo[sectionIndex].details[detailIndex].values = [
                value,
                ...updatedInfo[sectionIndex].details[detailIndex].values,
            ];
            setTechInfo(updatedInfo);
            setInputs((prev) => ({ ...prev, [`value-${sectionIndex}-${detailIndex}`]: '' }));
        }
    };

    const deleteSection = (sectionIndex) => {
        setTechInfo(techInfo.filter((_, idx) => idx !== sectionIndex));
    };

    const deleteDetail = (sectionIndex, detailIndex) => {
        const updatedInfo = [...techInfo];
        updatedInfo[sectionIndex].details.splice(detailIndex, 1);
        setTechInfo(updatedInfo);
    };

    const deleteValue = (sectionIndex, detailIndex, valueIndex) => {
        const updatedInfo = [...techInfo];
        updatedInfo[sectionIndex].details[detailIndex].values.splice(valueIndex, 1);
        setTechInfo(updatedInfo);
    };

    const saveData = () => {
        const formattedData = techInfo.map((section) => ({
            title: section.title,
            details: section.details.map((detail) => ({
                name: detail.name,
                value: detail.values.join(', '),
            })),
        }));
        onSave(formattedData);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter new section title"
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={addSection}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Section
                </button>
                <button
                    onClick={saveData}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                >
                    Save Data
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {techInfo.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border rounded-lg p-4 shadow-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{section.title}</h2>
                            <button onClick={() => deleteSection(sectionIndex)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </div>

                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                value={inputs[`detailName-${sectionIndex}`] || ''}
                                onChange={(e) =>
                                    setInputs((prev) => ({
                                        ...prev,
                                        [`detailName-${sectionIndex}`]: e.target.value,
                                    }))
                                }
                                placeholder="Enter detail name"
                                className="flex-grow p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={() => addDetail(sectionIndex)}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                            >
                                Add Detail
                            </button>
                        </div>

                        <div className="mt-4">
                            {section.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex justify-between items-start gap-4 mb-2">
                                    <div className="flex-1">
                                        <span className="font-medium">{detail.name}</span>
                                    </div>
                                    <div className="flex-1 flex flex-wrap gap-2">
                                        {detail.values.map((value, valueIndex) => (
                                            <div key={valueIndex} className="flex items-center">
                                                <span className="mr-2">{value}</span>
                                                <button
                                                    onClick={() =>
                                                        deleteValue(sectionIndex, detailIndex, valueIndex)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            value={inputs[`value-${sectionIndex}-${detailIndex}`] || ''}
                                            onChange={(e) =>
                                                setInputs((prev) => ({
                                                    ...prev,
                                                    [`value-${sectionIndex}-${detailIndex}`]: e.target.value,
                                                }))
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                addValueToDetail(sectionIndex, detailIndex)
                                            }
                                            placeholder="Add value"
                                            className="p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnologyInfo;
