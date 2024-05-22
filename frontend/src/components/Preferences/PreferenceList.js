import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const PreferenceList = () => {
    const [preferences, setPreferences] = useState([]);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await axios.get('/preferences');
                setPreferences(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchPreferences();
    }, []);

    return (
        <div>
            <h2>Preferences List</h2>
            <ul>
                {preferences.map((preference) => (
                    <li key={preference._id}>
                        User ID: {preference.user_id} - Theme: {preference.theme}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreferenceList;
