import CryptoJS from 'crypto-js';

const CLOUD_NAME = 'dkffhpyc6';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'Dev5G-Image';
const API_KEY = '341784271881655';
const API_SECRET = '9YKI8kwjThQ1BGvF99_lYem4Src';

 export const deleteImage = async (folderName, publicId) => {
    const fullPublicId = `${folderName}/${publicId}`;
    console.log('Full publicId before destroy:', fullPublicId);

    const timestamp = Math.floor(Date.now() / 1000);

    const stringToSign = `public_id=${fullPublicId}&timestamp=${timestamp}${API_SECRET}`;

    const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);

    const formData = new FormData();
    formData.append('public_id', fullPublicId);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    try {
        // Send the POST request to Cloudinary's destroy endpoint
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            body: formData,
        });

        // Parse the response
        const data = await response.json();
        console.log('Delete Response:', data);

        // Handle success or error
        if (data.result === 'ok') {
            console.log('Image deleted successfully.');
            return data; // Return success response
        } else {
            console.error('Failed to delete image:', data);
            throw new Error(data.message || 'Failed to delete image');
        }
    } catch (error) {
        console.error('Error during image deletion:', error);
        throw error;
    }
};

// Function to upload the image to Cloudinary
export const uploadImage = async (imageFile, folderName, categoryName) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', folderName);           // Specify the folder
    formData.append('public_id', categoryName);     // Set the public_id to categoryName

    try {
        const response = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log('Cloudinary Upload Response:', data);
        if (response.ok) {
            return data; // The Cloudinary response contains the uploaded image URL and other details
        } else {
            throw new Error(data.message || 'Upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
