import React, { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import mammoth from "mammoth/mammoth.browser";
import HTMLtoDOCX from "html-to-docx-lite";
import { handleDocxUpload } from "../../configs/Cloudinary.jsx";

const RichTextEditor = forwardRef(
    ({ docxUrl, fileName, onDescriptionUrlChange, errors }, ref) => {
        const [html, setHtml] = useState(""); // Editor content
        const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

        const fetchAndParseDocx = async (url) => {
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setHtml(result.value);
            } catch (error) {
                console.error("Error fetching or parsing DOCX:", error);
            }
        };

        const isValidHttpUrl = (url) => {
            try {
                const parsedUrl = new URL(url);
                return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
            } catch (e) {
                return false;
            }
        };

        useEffect(() => {
            if (docxUrl && isValidHttpUrl(docxUrl)) {
                fetchAndParseDocx(docxUrl);
            }
        }, [docxUrl]);

        useEffect(() => {
            // Check if the description is empty when the content changes
            setIsDescriptionEmpty(html.trim() === "");
        }, [html]);

        const encodeImagesToBase64 = async (htmlContent) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, "text/html");
            const images = doc.querySelectorAll("img");

            await Promise.all(
                Array.from(images).map(async (img) => {
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    const reader = new FileReader();
                    return new Promise((resolve) => {
                        reader.onloadend = () => {
                            img.src = reader.result;
                            resolve();
                        };
                        reader.readAsDataURL(blob);
                    });
                })
            );

            return doc.body.innerHTML;
        };

        const handleUploadToCloudinary = async (callback) => {
            if (isDescriptionEmpty) {
                alert("Description cannot be empty.");
                return;
            }

            if (!html) {
                console.error("No content to upload.");
                return;
            }
            try {
                const encodedHtml = await encodeImagesToBase64(html);
                const blob = await HTMLtoDOCX(encodedHtml);
                const docxFile = new File(
                    [blob],
                    `${fileName || "document"}.docx`,
                    { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
                );

                if (docxFile.size > 5 * 1024 * 1024) {
                    console.error("File size exceeds 5 MB");
                    alert("The generated file size exceeds 5 MB. Please reduce the content.");
                    return;
                }

                const response = await handleDocxUpload(docxFile, "document", fileName || "default_folder");

                if (callback) {
                    callback(response.secure_url);
                }

                return response.secure_url;
            } catch (error) {
                console.error("Error uploading file:", error);
                throw error;
            }
        };

        // Expose the upload function to parent through ref
        useImperativeHandle(ref, () => ({
            uploadToCloudinary: handleUploadToCloudinary,
        }));

        const handleDescriptionChange = (value) => {
            setHtml(value);
        };

        return (
            <div className="editor-container">
                <FroalaEditorComponent model={html} onModelChange={handleDescriptionChange} />
                {(errors || isDescriptionEmpty) && (
                    <p className="text-red-500 text-sm mt-2">
                        {errors || "Description cannot be empty."}
                    </p>
                )}
            </div>
        );
    }
);

export default RichTextEditor;
