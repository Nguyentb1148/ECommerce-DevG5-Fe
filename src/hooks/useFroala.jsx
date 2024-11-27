import { useState, useRef, useEffect } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import { uploadDoc } from "../configs/Cloudinary.jsx"; // Assuming this is the path to the uploadDoc function

export const useFroala = () => {
    const [model, setModel] = useState("<p > </p>");
    const editorRef = useRef(null);

    useEffect(() => {
        // Ensure Froala editor is initialized
        if (editorRef.current) {
            console.log("Froala editor initialized");
        }
    }, [editorRef]);

    const exportToDoc = async () => {
        if (editorRef.current) {
            let content = editorRef.current.editor.html.get();
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");

            const images = doc.querySelectorAll("img");

            for (const img of images) {
                const src = img.getAttribute("src");
                if (src && !src.startsWith("data:")) {
                    try {
                        const response = await fetch(src);
                        if (!response.ok) throw new Error(`Failed to fetch image: ${src}`);
                        const blob = await response.blob();
                        const reader = new FileReader();

                        await new Promise((resolve, reject) => {
                            reader.onload = () => {
                                img.setAttribute("src", reader.result); // Replace src with base64
                                resolve();
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                    } catch (error) {
                        console.error("Failed to fetch image:", src, error);
                        // Handle fallback behavior or continue with the export without this image
                    }
                }
            }

            content = doc.documentElement.innerHTML;

            try {
                const blob = new Blob(
                    [
                        `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
                        <head><meta charset="utf-8"></head>
                        <body>${content}</body>
                    </html>`,
                    ],
                    { type: "application/msword" }
                );

                // Creating a URL for the DOCX file and returning it
                const docxFile = new File([blob], "exported_document.docx", { type: "application/msword" });
                return docxFile;  // Return the file object here
            } catch (error) {
                console.error("Error creating the DOCX file:", error);
                throw new Error("Failed to create DOCX file.");
            }
        }
    };


    return { model, setModel, editorRef, exportToDoc };
};
