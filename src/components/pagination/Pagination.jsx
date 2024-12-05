import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPages = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <a
                        href="#product"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(i);
                        }}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === i
                                ? 'border hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white'
                                : 'border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                        aria-current={currentPage === i ? 'page' : undefined}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pages;
    };

    return (
        <nav>
            <ul
                data-aos="fade-up"
                data-aos-delay="250"
                className="flex items-center justify-center -space-x-px mt-4 text-base">
                {currentPage > 1 && (
                    <li>
                        <a
                            href="#product"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage - 1);
                            }}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="w-2.5 h-2.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </a>
                    </li>
                )}
                {renderPages()}
                {currentPage < totalPages && (
                    <li>
                        <a
                            href="#product"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage + 1);
                            }}
                            className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-2.5 h-2.5 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;