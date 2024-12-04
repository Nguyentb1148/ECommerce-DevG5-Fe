import CryptoJS from "crypto-js";

const CLOUD_NAME = "dkffhpyc6";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = "Dev5G-Image";
const API_KEY = "341784271881655";
const API_SECRET = "9YKI8kwjThQ1BGvF99_lYem4Src";

// Check if the image exists on Cloudinary
const checkImageExists = async (folderName, publicId) => {
  const fullPublicId = `${folderName}/${publicId}`;
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/${fullPublicId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log("Image exists.");
      return true;
    } else {
      console.log("Image not found.");
      return false;
    }
  } catch (error) {
    console.error("Error checking image existence:", error);
    return false;
  }
};

// Delete image from Cloudinary
export const deleteImage = async (folderName, publicId) => {
  const fullPublicId = `${folderName}/${publicId}`;
  console.log("Full publicId before destroy:", fullPublicId);

  // Check if image exists before attempting deletion
  const imageExists = await checkImageExists(folderName, publicId);
  if (!imageExists) {
    console.log("Image not found, skipping deletion.");
    return; // Skip the deletion process if the image doesn't exist
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `public_id=${fullPublicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);

  const formData = new FormData();
  formData.append("public_id", fullPublicId);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  try {
    // Send the POST request to Cloudinary's destroy endpoint
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Parse the response
    const data = await response.json();
    console.log("Delete Response:", data);

    // Handle success or error
    if (data.result === "ok") {
      console.log("Image deleted successfully.");
      return data; // Return success response
    } else {
      console.error("Failed to delete image:", data);
      throw new Error(data.message || "Failed to delete image");
    }
  } catch (error) {
    console.error("Error during image deletion:", error);
    throw error;
  }
};

// Upload image to Cloudinary
export const uploadImage = async (imageFile, folderName, public_id) => {
  if (imageFile.size > 2 * 1024 * 1024) {
    throw new Error("Image exceeds the 2MB size limit");
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folderName); // Specify the folder
  formData.append("public_id", public_id); // Set the public_id to categoryName

  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Cloudinary Upload Response:", data);
    if (response.ok) {
      return data; // The Cloudinary response contains the uploaded image URL and other details
    } else {
      throw new Error(data.message || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Upload DOC file to Cloudinary (if needed)
export const uploadDoc = async (docFile, folderName, categoryName) => {
  const formData = new FormData();
  formData.append("file", docFile); // Append the DOC file
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folderName); // Specify the folder
  formData.append("public_id", categoryName); // Set the public_id to categoryName
  formData.append("resource_type", "raw"); // Specify that it's a raw file (DOCX)

  // Use the raw upload endpoint for non-image files (like DOCX)
  const UPLOAD_URL_RAW = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

  try {
    const response = await fetch(UPLOAD_URL_RAW, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Cloudinary DOC Upload Response:", data);

    if (response.ok) {
      return data; // The Cloudinary response contains the uploaded file URL and other details
    } else {
      throw new Error(data.message || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading DOC file:", error);
    throw error;
  }
};

// Handle the image upload process including deletion of the old image if it exists
export const handleImageUpload = async (imageFile, folderName, publicId) => {
  // First, try deleting the existing image (if it exists)
  try {
    await deleteImage(folderName, publicId);
  } catch (error) {
    console.log(
      "Image not found or error during deletion, uploading new image..."
    );
  }

  // Upload the new image
  try {
    const uploadedData = await uploadImage(imageFile, folderName, publicId);
    console.log("New image uploaded successfully:", uploadedData);
    return uploadedData;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
