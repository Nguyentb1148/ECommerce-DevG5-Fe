import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from "react-data-table-component";

createTheme(
    "dark",
    {
        text: {
            primary: "#e5e7eb",
            secondary: "#9ca3af",
        },
        background: {
            default: "#1f2937",
        },
        context: {
            background: "#374151",
            text: "#ffffff",
        },
        divider: {
            default: "#4b5563",
        },
        action: {
            button: "#4f46e5",
            hover: "rgba(255, 255, 255, 0.1)",
            disabled: "rgba(255, 255, 255, 0.3)",
        },
    },
    "dark"
);

const CustomDataTable = ({ columns, records }) => {
    const [scrollHeight, setScrollHeight] = useState("430px");

    const updateScrollHeight = () => {
        if (window.innerWidth < 768) {
            setScrollHeight("400px");
        } else if (window.innerWidth < 1024) {
            setScrollHeight("440px");
        } else if (window.innerWidth < 1280) {
            setScrollHeight("460px");
        } else {
            setScrollHeight("650px");
        }
    };

    useEffect(() => {
        updateScrollHeight();
        window.addEventListener("resize", updateScrollHeight);
        return () => window.removeEventListener("resize", updateScrollHeight);
    }, []);

    return (
        <div className="overflow-hidden">
            <DataTable
                theme="dark"
                columns={columns}
                data={records}
                fixedHeader
                pagination
                fixedHeaderScrollHeight={scrollHeight}
                paginationPosition="bottom"
            />
        </div>
    );
}

export default CustomDataTable;