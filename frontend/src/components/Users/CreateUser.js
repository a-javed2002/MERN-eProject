import React, { useState } from 'react';
import axios from '../../api/axiosConfig';
import MyHeader from '../Main/header';
import MyAsideBar from '../Main/aside';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users', {
                username,
                password,
                email,
                name,
            });
            console.log(response.data);
            // Handle successful creation
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <>
        <MyHeader/>
        <MyAsideBar/>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0">Dashboard</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard v1</li>
                    </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
        </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
        <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputUsername">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                required
                            />
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Create User</button>
                    </div>
                </form>
            </div>{/* /.row (main row) */}
        </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
</div>

            {/* /.content-wrapper */}
        </>
    );
};

export default CreateUser;
