import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ userId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(`/auth/upload/profile-picture/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploading(false);
      onUploadSuccess(response.data.user.profile_picture);
    } catch (err) {
      setUploading(false);
      setError('Error uploading image');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUploadForm;
