import React, { useState,useEffect } from 'react';
import axios from '../api/axiosConfig';

const ProfileImageModal = ({ show, onClose, userId, setUserData }) => {
    useEffect(() => {
        console.log("ProfileImageModal show:", show);
    }, [show]);

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('profileImage', image);

        try {
            const response = await axios.post(`/users/${userId}/profile-picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUserData(response.data);
            onClose();
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Profile Image</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="file" onChange={handleImageChange} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileImageModal;
