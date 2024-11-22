import CryptoJS from 'crypto-js';  // Import CryptoJS for signature generation

const CLOUD_NAME = 'dkffhpyc6';  // Your Cloudinary Cloud Name
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = 'Dev5G-Image'; // You need to configure this in Cloudinary's settings
const API_KEY = '341784271881655'; // Your Cloudinary API Key
const API_SECRET = '9YKI8kwjThQ1BGvF99_lYem4Src'; // Your Cloudinary API Secret (keep it safe)

// import cloudinary from 'cloudinary';
//
// // Change cloud name, API Key, and API Secret below
//
// cloudinary.v2.config({
//     cloud_name: 'dkffhpyc6',
//     api_key: '341784271881655',
//     api_secret: '9YKI8kwjThQ1BGvF99_lYem4Src'
// });

// Function to generate signature for Cloudinary's API
// const generateSignature = (publicId) => {
//     const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
//
//     // Signature string format (without api_secret in the URL but using it to generate the signature)
//     const signatureString = `public_id=${publicId}&timestamp=${timestamp}&api_key=${API_KEY}&api_secret=${API_SECRET}`;
//
//     // Create SHA1 hash of the signature string and encode it in Base64
//     const signature = CryptoJS.SHA1(signatureString).toString(CryptoJS.enc.Base64);
//
//     return { signature, timestamp };
// };
// Function to delete an image from Cloudinary
// export const deleteImage = async (publicId) => {
//     cloudinary.v2.uploader.destroy(publicId, function(result) { console.log(result) });
//
// };

// Function to delete an image (via API request directly)
export const deleteImage = async (folderName, publicId) => {
    // Combine folderName and publicId into the full Cloudinary public_id
    const fullPublicId = `${folderName}/${publicId}`;
    console.log('Full publicId before destroy:', fullPublicId);

    // Get the current timestamp
    const timestamp = Math.floor(Date.now() / 1000);

    // Create the string to sign by sorting parameters alphabetically and appending the API secret
    const stringToSign = `public_id=${fullPublicId}&timestamp=${timestamp}${API_SECRET}`;

    // Generate the signature using SHA-1
    const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);

    // Prepare the POST form data
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
