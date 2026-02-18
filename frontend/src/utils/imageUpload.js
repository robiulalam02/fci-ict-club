import axios from "axios";

/**
 * Uploads an image file to ImgBB and returns the display URL
 * @param {File} imageFile - The file object from the input
 * @returns {Promise<string>} - The public image URL
 */
export const imageUpload = async (imageFile) => {
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; // Recommended to use .env
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            formData
        );

        if (response.data.success) {
            return response.data.data.display_url;
        }
    } catch (error) {
        console.error("ImgBB Upload Error:", error);
        throw new Error("Failed to upload image to ImgBB");
    }
};