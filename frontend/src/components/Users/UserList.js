import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';
import MyHeader from '../Main/header';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
            <MyHeader/>
            <div>
                <h2>User List</h2>
                <div className="card">
                    <div className="card-body">
                        <table id="example" className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                    {/* Add more columns as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>kdsakdsa</td> {/* Assuming height is in basic_info */}
                                        <td>kdsakdsa</td> {/* Assuming height is in basic_info */}
                                        <td>kdsakdsa</td> {/* Assuming height is in basic_info */}
                                        {/* <td>{user.basic_info.weight}</td> Assuming weight is in basic_info */}
                                        {/* Add more cells for additional fields */}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Gender</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                    {/* Add more columns as needed */}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <script src="./scrptt.js"></script>
        </>
    );
};

export default UserList;
