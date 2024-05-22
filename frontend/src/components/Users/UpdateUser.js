import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UpdateUser = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchUser();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/users/${userId}`, user);
            console.log(response.data);
            // Handle successful update
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    if (!user) return <div>Loading...</div>;

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <button type="submit">Update User</button>
        </form>
    );
};

export default UpdateUser;
