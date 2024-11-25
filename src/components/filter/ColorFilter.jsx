import React, { useState } from "react";

const ColorFilter = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    { id: 1, color: "bg-black", label: "Black" },
    { id: 2, color: "bg-blue-500", label: "Blue" },
    { id: 3, color: "bg-gray-400", label: "Gray" },
    { id: 4, color: "bg-green-500", label: "Green" },
    { id: 5, color: "bg-orange-500", label: "Orange" },
    { id: 6, color: "bg-purple-500", label: "Purple" },
    { id: 7, color: "bg-red-500", label: "Red", count: 55 },
    { id: 8, color: "bg-white border border-gray-300", label: "White" },
    { id: 9, color: "bg-yellow-400", label: "Yellow" },
  ];

  const toggleColor = (id) => {
    setSelectedColor(selectedColor === id ? null : id);
  };

  return (
    <div className="">

      {/* Color Grid */}
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <div
            key={color.id}
            className={`flex flex-col items-center cursor-pointer`}
            onClick={() => toggleColor(color.id)}
          >
            {/* Color Box */}
            <div
              className={`w-8 h-8 rounded ${color.color} ${selectedColor === color.id ? "ring-2 ring-offset-1 ring-blue-500" : ""
                }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
