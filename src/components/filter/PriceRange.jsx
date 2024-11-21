import React, { useState } from "react";
import { Range } from "react-range";

const PriceRange = () => {
    const [price, setPrice] = useState([30, 800]); 

    return (
        <div className="">
            <h3 className="font-semibold text-lg">Price</h3>
            <div className="flex justify-between items-center my-2">
                <span className="text-sm font-medium">Min: {price[0]}$</span>
                <span className="text-sm font-medium">Max: {price[1]}$</span>
            </div>

            <Range
                step={1}
                min={10}
                max={1000}
                values={price}
                onChange={(values) => setPrice(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="w-full h-2 bg-gray-200 rounded-lg relative"
                    >
                        <div
                            style={{
                                position: "absolute",
                                height: "100%",
                                background: "limegreen",
                                borderRadius: "4px",
                                left: `${((price[0] - 10) / (1000 - 10)) * 100}%`,
                                width: `${((price[1] - price[0]) / (1000 - 10)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="w-5 h-5 bg-white border-2 border-limegreen rounded-full shadow-lg"
                    />
                )}
            />

        </div>
    );
};

export default PriceRange;
