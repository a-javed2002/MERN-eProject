import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import MyAsideBar from './Main/aside';
import MyHeader from './Main/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, subject, message } = formData;

        // Check if all fields are filled
        if (!name || !email || !subject || !message) {
            toast.warning('All fields must be filled');
            return;
        }

        try {
            const response = await axios.post('/users/sendEmail', { name, email, subject, message });
            if (response.status === 200) {
                toast.success('Email sent successfully');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send email');
        }
    };

    return (
        <>
            <MyHeader />
            <MyAsideBar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Contact us</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Contact us</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body row">
                            <div className="col-5 text-center d-flex align-items-center justify-content-center">
                                <div>
                                    <h2>Admin<strong>LTE</strong></h2>
                                    <p className="lead mb-5">123 Testing Ave, Testtown, 9876 NA<br />
                                        Phone: +1 234 56789012
                                    </p>
                                </div>
                            </div>
                            <div className="col-7">
                                <ToastContainer />
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="inputName">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">E-Mail</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputSubject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="form-control"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputMessage">Message</label>
                                        <textarea
                                            id="message"
                                            className="form-control"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Send message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ContactUs;
