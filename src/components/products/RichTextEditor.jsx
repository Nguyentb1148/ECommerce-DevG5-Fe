import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import { useEffect, forwardRef, useImperativeHandle, useState } from "react";
import mammoth from "mammoth/mammoth.browser";
import HTMLtoDOCX from "html-to-docx-lite";
import { uploadDoc } from "../../configs/Cloudinary.jsx";

const RichTextEditor = forwardRef(({ docxUrl, fileName, onDescriptionUrlChange }, ref) => {
    const [html, setHtml] = useState(""); // Editor content

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

    useEffect(() => {
        if (docxUrl) {
            fetchAndParseDocx(docxUrl);
        }
    }, [docxUrl]);

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

    const handleUploadToCloudinary = async () => {
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

            // Check the size of the file (5 MB = 5 * 1024 * 1024 bytes)
            if (docxFile.size > 5 * 1024 * 1024) {
                console.error("File size exceeds 5 MB. Please reduce the content.");
                alert("The generated file size exceeds 5 MB. Please reduce the content or remove large images.");
                return; // Exit the function if the file is too large
            }

            const response = await uploadDoc(docxFile, "document", fileName || "default_folder");

            // Notify parent of the uploaded URL
            if (onDescriptionUrlChange) {
                onDescriptionUrlChange(response.secure_url);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Expose the upload function to parent through ref
    useImperativeHandle(ref, () => ({
        uploadToCloudinary: handleUploadToCloudinary,
    }));

    return (
        <div className="editor-container">
            <FroalaEditorComponent model={html} onModelChange={setHtml} />
        </div>
    );
});

export default RichTextEditor;