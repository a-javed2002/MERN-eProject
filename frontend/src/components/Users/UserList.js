import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
