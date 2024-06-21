import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import MyAsideBar from './Main/aside';
import MyHeader from './Main/header';
import ProfileImageModal from './ProfileImageModal';
import BasicInfoModal from './BasicInfoModal';
import { useParams } from 'react-router-dom';

const ProfileAll = () => {
    const [userData, setUserData] = useState(null);
    const [showProfileImageModal, setShowProfileImageModal] = useState(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
    let { userId } = useParams();
    if(userId==null){
        userId = "665612cf2d30a599cfd3b805";
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };
        fetchUserData();
    }, []);

    const toggleProfileImageModal = () => {
        setShowProfileImageModal(!showProfileImageModal);
    };

    const toggleBasicInfoModal = () => {
        setShowBasicInfoModal(!showBasicInfoModal);
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <>
        <MyHeader/>
        <MyAsideBar/>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Profile</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">User Profile</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle" src={`http://localhost:8080/${userData.profile_picture}`} alt="User profile picture" />
                                        </div>
                                        <h3 className="profile-username text-center">{userData.name}</h3>
                                        <p className="text-muted text-center">{userData.email}</p>
                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Username</b> <a className="float-right">{userData.username}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Gender</b> <a className="float-right">{userData.basic_info.gender}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Age</b> <a className="float-right">{userData.basic_info.age}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Height</b> <a className="float-right">{userData.basic_info.height} cm</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Weight</b> <a className="float-right">{userData.basic_info.weight} kg</a>
                                            </li>
                                        </ul>
                                        <button className="btn btn-primary btn-block" onClick={toggleProfileImageModal}>Update Profile Image</button>
                                        <button className="btn btn-primary btn-block" onClick={toggleBasicInfoModal}>Update Basic Info</button>
                                    </div>
                                </div>
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">FCM Tokens</h3>
                                    </div>
                                    <div className="card-body">
                                        {userData.fcmTokens.map((token) => (
                                            <div key={token._id}>
                                                <strong>Token:</strong> {token.token}<br />
                                                <strong>Login Time:</strong> {new Date(token.loginTime).toLocaleString()}<br />
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Activity</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#nutrition" data-toggle="tab">Nutrition Logs</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#progress" data-toggle="tab">Progress Logs</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#workout" data-toggle="tab">Workout Routines</a></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="activity">
                                                <div className="post">
                                                    <div className="user-block">
                                                        <img className="img-circle img-bordered-sm" src={`http://localhost:8080/${userData.profile_picture}`} alt="user image" />
                                                        <span className="username">
                                                            <a href="#">{userData.name}</a>
                                                        </span>
                                                        <span className="description">Member since - {new Date(userData.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <p>Email: {userData.email}</p>
                                                    <p>Username: {userData.username}</p>
                                                    <p>Gender: {userData.basic_info.gender}</p>
                                                    <p>Age: {userData.basic_info.age}</p>
                                                    <p>Height: {userData.basic_info.height} cm</p>
                                                    <p>Weight: {userData.basic_info.weight} kg</p>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="nutrition">
                                                {userData.nutrition_logs.map((log) => (
                                                    <div key={log._id}>
                                                        <strong>Meal Type:</strong> {log.meal_type}<br />
                                                        <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}<br />
                                                        <strong>Details:</strong> {log.details}<br />
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="tab-pane" id="progress">
                                                {userData.progress_logs.map((log, index) => (
                                                    <div key={index}>
                                                        <strong>Chest:</strong> {log.body_measurements.chest} cm<br />
                                                        <strong>Waist:</strong> {log.body_measurements.waist} cm<br />
                                                        <strong>Hips:</strong> {log.body_measurements.hips} cm<br />
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="tab-pane" id="workout">
                                                {userData.workout_routines.map((routine) => (
                                                    <div key={routine._id}>
                                                        <strong>Category:</strong> {routine.category}<br />
                                                        <strong>Details:</strong> {routine.details}<br />
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
              {/* Profile Image Modal */}
              <ProfileImageModal
                show={showProfileImageModal}
                handleClose={toggleProfileImageModal}
                userId={userId}
                profilePicture={userData.profile_picture}
            />

            {/* Basic Info Modal */}
            {/* <BasicInfoModal
                show={showBasicInfoModal}
                handleClose={toggleBasicInfoModal}
                userId={userId}
                basicInfo={userData.basic_info}
            /> */}
        </>
    );
};

export default ProfileAll;
