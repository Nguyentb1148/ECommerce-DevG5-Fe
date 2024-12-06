import React from 'react'

const LoadingText = () => {
    return (
        <div className="grid place-items-center gap-3 h-screen">
            <h2 className="text-6xl font-manrope font-extrabold text-transparent bg-gradient-to-tr from-indigo-600 to-pink-600 bg-clip-text flex items-center justify-center">
                L
                <div className="items-center justify-center rounded-md w-10 h-10 flex bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
                    <div className="h-7 w-7 rounded-md bg-white"></div>
                </div>
                ading...
            </h2>
        </div>
    )
}

export default LoadingText;