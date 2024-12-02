import { useState, useEffect, useRef } from "react";
import mammoth from "mammoth/mammoth.browser.js";  // Import Mammoth library
import JSZip from "jszip";

export const useFroala = (descriptionFileUrl) => {
    const [model, setModel] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (descriptionFileUrl) {
            setIsLoading(true);

            // First, fetch the raw content to check if it's HTML
            fetch(descriptionFileUrl)
                .then(async (response) => {
                    const data = await response.blob()

                    return response
                })
                .then((response) => response.text())  // Fetch the raw content as text
                .then((text) => {
                    console.log("Raw file content:", text);
                    // Check if the content is HTML, if it is throw an error
                    if (text.includes("<html>")) {
                        throw new Error("Received HTML content instead of DOCX.");
                    }
                    // If not HTML, proceed with fetching the file as an ArrayBuffer
                    return fetch(descriptionFileUrl);  // Make a new fetch call to get the arrayBuffer
                })
                .then((response) => response.arrayBuffer())  // Now we can safely call arrayBuffer() here
                .then((buffer) => {
                    mammoth.convertToHtml({ arrayBuffer: buffer })
                        .then((result) => {
                            setModel(result.value);  // Set the HTML content to the Froala editor
                            setIsLoading(false);
                        })
                        .catch((error) => {
                            console.error("Error converting DOCX to HTML using Mammoth:", error);
                            fetchAndParseDocx(descriptionFileUrl);  // Fallback to JSZip parsing
                        });
                })
                .catch((error) => {
                    console.error("Error fetching DOCX file:", error);
                    setIsLoading(false);
                });
        }
    }, [descriptionFileUrl]);

    // Fallback function for parsing DOCX using JSZip
    const fetchAndParseDocx = async (url) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const xmlContent = await zip.file("word/document.xml").async("text");
            const parser = new DOMParser();
            const doc = parser.parseFromString(xmlContent, "application/xml");
            console.log(doc);  // Debug the XML content
            setModel(doc.documentElement.outerHTML); // Set XML content to the editor (you can adjust how you want to render it)
        } catch (error) {
            console.error("Error parsing DOCX:", error);
            throw error;
        }
    };

    // Function to export content from Froala editor to DOCX format
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
                                img.setAttribute("src", reader.result);  // Replace src with base64
                                resolve();
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                    } catch (error) {
                        console.error("Failed to fetch image:", src, error);
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
                const docxFile = new File([blob], "exported_document.docx", { type: "application/msword" });
                return docxFile;
            } catch (error) {
                console.error("Error creating DOCX file:", error);
                throw new Error("Failed to create DOCX file.");
            }
        }
    };

    return { model, setModel, editorRef, isLoading, exportToDoc };
};
