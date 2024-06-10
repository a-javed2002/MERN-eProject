import React, { useState,useEffect } from 'react';
import axios from '../api/axiosConfig';

const BasicInfoModal = ({ show, onClose, userId, userData, setUserData }) => {
    useEffect(() => {
        console.log("BasicInfoModal show:", show);
    }, [show]);

    const [basicInfo, setBasicInfo] = useState(userData.basic_info);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/users/${userId}/basic-info`, basicInfo);
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
                        <h5 className="modal-title">Update Basic Info</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Gender:</label>
                            <input type="text" className="form-control" name="gender" value={basicInfo.gender} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" className="form-control" name="age" value={basicInfo.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Height (cm):</label>
                            <input type="number" className="form-control" name="height" value={basicInfo.height} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Weight (kg):</label>
                            <input type="number" className="form-control" name="weight" value={basicInfo.weight} onChange={handleChange} />
                        </div>
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

export default BasicInfoModal;
