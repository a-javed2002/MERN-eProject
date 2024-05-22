import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreatePreference = () => {
    const [userId, setUserId] = useState('');
    const [workoutReminders, setWorkoutReminders] = useState(true);
    const [goalAchievements, setGoalAchievements] = useState(true);
    const [newFollowers, setNewFollowers] = useState(true);
    const [forumResponses, setForumResponses] = useState(true);
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState('metric');
    const [theme, setTheme] = useState('light');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/preferences', {
                user_id: userId,
                notification_preferences: {
                    workout_reminders: workoutReminders,
                    goal_achievements: goalAchievements,
                    new_followers: newFollowers,
                    forum_responses: forumResponses
                },
                units_of_measurement: unitsOfMeasurement,
                theme
            });
            console.log(response.data);
            // Handle successful creation
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                required
            />
            <label>
                <input
                    type="checkbox"
                    checked={workoutReminders}
                    onChange={(e) => setWorkoutReminders(e.target.checked)}
                />
                Receive workout reminders
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={goalAchievements}
                    onChange={(e) => setGoalAchievements(e.target.checked)}
                />
                Receive goal achievements
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={newFollowers}
                    onChange={(e) => setNewFollowers(e.target.checked)}
                />
                Receive notifications for new followers
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={forumResponses}
                    onChange={(e) => setForumResponses(e.target.checked)}
                />
                Receive notifications for forum responses
            </label>
            <select value={unitsOfMeasurement} onChange={(e) => setUnitsOfMeasurement(e.target.value)} required>
                <option value="imperial">Imperial</option>
                <option value="metric">Metric</option>
            </select>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} required>
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
            </select>
            <button type="submit">Create Preference</button>
        </form>
    );
};

export default CreatePreference;
