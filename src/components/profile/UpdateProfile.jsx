import React, { useState, useEffect } from 'react';
import { FaUpload } from "react-icons/fa";
// import { uploadImage } from './path-to-your-upload-image-function';
import { uploadImage } from '../../configs/Cloudinary';
import authApi from '../../services/AxiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateProfile = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        birthDate: "",
        gender: "",
        imageUrl: ""
    });

    const [errors, setErrors] = useState({});
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            // Chuyển đổi birthDate từ ISO format sang YYYY-MM-DD
            const formattedBirthDate = user.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                : ""; // Nếu không có birthDate, để trống
    
            setProfileData({
                name: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                birthDate: formattedBirthDate || "", // Sử dụng ngày đã chuyển đổi
                gender: user.gender || "",
                imageUrl: user.imageUrl || "",
            });
            setProfileImage(user.imageUrl || null);
        }
    }, []);
    
        

    // Validation logic
    const validate = () => {
        const newErrors = {};

        // Validate name: at least two words
        if (!profileData.name.trim() || profileData.name.trim().split(" ").length < 2) {
            newErrors.name = "Name must contain at least two words.";
        }

        // Validate phone number: starts with 0 and exactly 10 digits
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(profileData.phone)) {
            newErrors.phone = "Phone number must start with 0 and contain exactly 10 digits.";
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
            newErrors.email = "Invalid email format.";
        }

        // Check if required fields are empty
        if (!profileData.address.trim()) {
            newErrors.address = "Address is required.";
        }

        if (!profileData.birthDate.trim()) {
            newErrors.birthDate = "Birth date is required.";
        }

        if (!profileData.gender) {
            newErrors.gender = "Gender is required."; // Kiểm tra trường gender
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            console.log("Updated Profile Data:", updatedData); // Log data on every change
            return updatedData;
        });
        // Clear error for the field being edited
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Preview image
    
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const uploadResponse = await uploadImage(file, 'user_profiles', user.id);
                console.log('Image uploaded successfully:', uploadResponse);
    
                // Update profileData with image URL
                setProfileData((prevData) => ({
                    ...prevData,
                    imageUrl: uploadResponse.secure_url, // URL from Cloudinary
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error("Failed to upload image. Please try again.", { position: toast.POSITION.TOP_RIGHT });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
     
        // Step 1: Validate data
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set the validation errors
            return; // Stop if there are validation errors
        }
     
        try {
            const user = JSON.parse(localStorage.getItem("user"));
     
            // Format birthDate as ISO 8601
            let formattedBirthDate = profileData.birthDate;
            if (formattedBirthDate) {
                const dateObj = new Date(formattedBirthDate);
                if (!isNaN(dateObj.getTime())) {
                    formattedBirthDate = dateObj.toISOString(); // Lưu dưới định dạng ISO 8601
                } else {
                    throw new Error("Invalid date format");
                }
            }
     
            const updatedData = { 
                ...profileData, 
                birthDate: formattedBirthDate, // Lưu ngày đúng định dạng ISO
                userId: user.id 
            };
     
            const response = await authApi.put(`/users/${user.id}`, updatedData);
            console.log("Profile updated successfully:", response.data);
     
            // Lưu lại vào localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Profile updated successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response?.status === 401) {
                toast.error("Session expired. Redirecting to login.", { position: "top-right" });
                window.location.href = "/login";
            } else {
                toast.error("Failed to update profile. Please try again.", { position: "top-right" });
            }
        }
    };
    
    

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
                <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                        <img
                            src={profileImage || "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-1713936211478.webp"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                            <FaUpload className="text-white" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"} dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            placeholder="0XXXXXXXXX"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:flex justify-between">
                        <div className="max-md:mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Birth Date</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={profileData.birthDate}
                                onChange={handleChange}
                                className={`mt-1 block max-md:w-full w-60 rounded-md  ${errors.birthDate ? "border-red-500" : "border-gray-300"} border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            />
                            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                        </div>
                        <div >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={profileData.gender}
                                onChange={handleChange}    
                                className={`block max-md:w-full w-60 ${errors.gender ? "border-red-500" : "border-gray-300"} mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600`}
                            >
                                <option value="">-- Select Gender --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border ${errors.address ? "border-red-500" : "border-gray-300"} dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                            rows="3"
                            placeholder="Enter your address"
                        ></textarea>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
