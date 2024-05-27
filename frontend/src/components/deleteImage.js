import axios from 'axios';

const deleteImage = async (userId, imageUrl) => {
  try {
    const encodedImageUrl = encodeURIComponent(imageUrl); // Encode the URL
    const response = await axios.delete(`/auth/gallery/${userId}/${encodedImageUrl}`);
    console.log('Image removed successfully:', response.data);
  } catch (error) {
    console.error('Error removing image:', error);
  }
};
