import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';

const ProfilePage = ({ user }) => {
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);

  const handleUploadSuccess = (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
    // Optionally, make an API call to update the user's profile picture in the database
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <img src={`/uploads/${profilePicture}`} alt="Profile" width="200" height="200" />
      <ImageUploadForm userId={user._id} onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default ProfilePage;
