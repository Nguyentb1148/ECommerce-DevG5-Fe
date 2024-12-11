import React from 'react'

const LoadingDots = () => {
    return (
        <div className="grid place-items-center gap-3 py-6">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-1.5 py-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-600 animate-BounceDelayOne"></div>
                    <div className="w-4 h-4 rounded-full bg-indigo-600 animate-BounceDelayTwo"></div>
                    <div className="w-4 h-4 rounded-full bg-indigo-600 animate-BounceDelayThree"></div>
                </div>
                <span
                    className="text-white text-lg font-normal leading-snug">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingDots