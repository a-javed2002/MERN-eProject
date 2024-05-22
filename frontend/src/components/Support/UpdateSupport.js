import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateSupport = ({ supportId }) => {
    const [supportRequest, setSupportRequest] = useState(null);

    useEffect(() => {
        const fetchSupportRequest = async () => {
            try {
                const response = await axios.get(`/support/${supportId}`);
                setSupportRequest(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchSupportRequest();
    }, [supportId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/support/${supportId}`, supportRequest);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupportRequest({ ...supportRequest, [name]: value });
    };

    if (!supportRequest) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="user_id"
                value={supportRequest.user_id}
                onChange={handleChange}
                placeholder="User ID"
                required
            />
            <input
                type="text"
                name="subject"
                value={supportRequest.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
            />
            <textarea
                name="message"
                value={supportRequest.message}
                onChange={handleChange}
                placeholder="Message"
                required
            />
            <button type="submit">Update Support Request</button>
        </form>
    );
};

export default UpdateSupport;
