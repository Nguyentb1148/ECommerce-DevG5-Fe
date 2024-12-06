import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { uploadImage } from "../../configs/Cloudinary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserProfile, userData } from "../../services/api/UserApi.jsx";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: Date(),
    gender: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false); // New state to track loading
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // New state for selected file

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          console.log("USER ID", user.id);
          const response = await userData(user.id || user._id); // Use user._id if user.id is undefined
          console.log(response.data);
          setProfileData({
            fullName: response.data.fullName || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
            dateOfBirth: response.data.dateOfBirth
              ? response.data.dateOfBirth.split("T")[0]
              : "",
            gender: response.data.gender || "",
            imageUrl: response.data.imageUrl || "",
          });
          setProfileImage(response.data.imageUrl || null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (
      !profileData.fullName.trim() ||
      profileData.fullName.trim().split(" ").length < 2
    ) {
      newErrors.fullname = "Name must contain at least two words.";
    }
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(profileData.phone)) {
      newErrors.phone =
        "Phone number must start with 0 and contain exactly 10 digits.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!profileData.address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!profileData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Birth date is required.";
    }
    if (!profileData.gender) {
      newErrors.gender = "Gender is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Preview image
      setSelectedFile(file); // Store the file for later upload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("processing...");
    setLoading(true); // Disable the button when starting the request

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let imageUrl = profileData.imageUrl;

      // Upload the image file if selected
      if (selectedFile) {
        const uploadResponse = await uploadImage(
          selectedFile,
          "user_profiles",
          user.id
        );
        imageUrl = uploadResponse.secure_url;
      }

      // Ensure dateOfBirth is in correct format before sending to server
      const formattedBirthDate = profileData.dateOfBirth
        ? new Date(profileData.dateOfBirth).toISOString()
        : null;

      const updatedData = {
        ...profileData,
        imageUrl,
        userId: user.id,
        dateOfBirth: formattedBirthDate, // Ensure correct ISO format
      };

      const response = await updateUserProfile(user.id, updatedData);
      localStorage.setItem("user", JSON.stringify(response.user));
      setProfileData({
        fullName: response.user.fullName,
        email: response.user.email,
        phone: response.user.phone,
        address: response.user.address,
        dateOfBirth: response.user.dateOfBirth
          ? new Date(response.user.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: response.user.gender,
        imageUrl: response.user.imageUrl,
      });

      console.log("Response object: ", response);
      console.log("Response message: ", response.message);

      // Strip spaces, handle lowercase, and ensure exact matching
      const normalizedMessage = response.message?.trim().toLowerCase();
      console.log("Normalized message: ", normalizedMessage);

      // Condition to check if the response message is correct
      if (normalizedMessage === "user updated successfully") {
        console.log("Password update successful, showing success toast");
        toast.success("Profile updated successfully!", {
          style: {
            color: "green",
            backgroundColor: "#eafaf1",
            border: "1px solid green",
          },
          position: "top-center",
        });
      } else {
        console.error("Unexpected response message:", response.message);
        toast.error("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false); // Re-enable the button after request completes
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-md"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <img
              src={profileImage || "https://example.com/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
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
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              placeholder="john@example.com"
              readOnly
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              placeholder="0XXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="md:flex justify-between">
            <div className="max-md:mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Birth Date
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth || ""}
                onChange={handleChange}
                className={`mt-1 block max-md:w-full w-60 rounded-md ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className={`block max-md:w-full w-60 ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-300 border-gray-600`}
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              placeholder="123 Main St, City"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
