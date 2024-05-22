import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const SupportList = () => {
    const [supportRequests, setSupportRequests] = useState([]);

    useEffect(() => {
        const fetchSupportRequests = async () => {
            try {
                const response = await axios.get('/support');
                setSupportRequests(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchSupportRequests();
    }, []);

    return (
        <div>
            <h2>Support Requests List</h2>
            <ul>
                {supportRequests.map((request) => (
                    <li key={request._id}>
                        User ID: {request.user_id} - Subject: {request.subject}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupportList;
