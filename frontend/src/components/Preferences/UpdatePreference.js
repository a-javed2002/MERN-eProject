import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdatePreference = ({ preferenceId }) => {
    const [preference, setPreference] = useState(null);

    useEffect(() => {
        const fetchPreference = async () => {
            try {
                const response = await axios.get(`/preferences/${preferenceId}`);
                setPreference(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchPreference();
    }, [preferenceId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/preferences/${preferenceId}`, preference);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPreference({ ...preference, [name]: value });
    };

    if (!preference) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="user_id"
                value={preference.user_id}
                onChange={handleChange}
                placeholder="User ID"
                required
            />
            <label>
                <input
                    type="checkbox"
                    checked={preference.notification_preferences.workout_reminders}
                    onChange={(e) => setPreference({
                        ...preference,
                        notification_preferences: {
                            ...preference.notification_preferences,
                            workout_reminders: e.target.checked
                        }
                    })}
                />
                Receive workout reminders
            </label>
            {/* Repeat similar labels for other preferences */}
            <select
                name="units_of_measurement"
                value={preference.units_of_measurement}
                onChange={handleChange}
                required
            >
                <option value="imperial">Imperial</option>
                <option value="metric">Metric</option>
            </select>
            <select
                name="theme"
                value={preference.theme}
                onChange={handleChange}
                required
            >
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
            </select>
            <button type="submit">Update Preference</button>
        </form>
    );
};

export default UpdatePreference;
