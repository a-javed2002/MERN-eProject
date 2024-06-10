import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from '../../../src/contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyHeader = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

  const handleLogout = () => {
    console.log("hmmmmmm");
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    logout(); // Call the logout function when the user confirms logout
    setShowModal(false); // Close the confirmation modal after logout
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Close the confirmation modal if the user cancels logout
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');

      // Send request to server to invalidate the token
      await axios.post('http://localhost:8080/api/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the token from localStorage
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally, you could handle errors, like redirecting to an error page or showing a notification
    }
  };
  return (
    <>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmLogout}>Yes</button>
              <button onClick={handleCancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/contact" href="#" className="nav-link">Contact</Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
            </div>
          </li>
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>
          <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"  onClick={handleLogout}>
              <img src="../../dist/img/user2-160x160.jpg" className="user-image img-circle elevation-2" alt="User Image" />
              <span className="d-none d-md-inline">Alexander Pierce</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              {/* User image */}
              <li className="user-header bg-primary">
                <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2012</small>
                </p>
              </li>
              {/* Menu Body */}
              <li className="user-body">
                <div className="row">
                  <div className="col-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                {/* /.row */}
              </li>
              {/* Menu Footer*/}
              <li className="user-footer">
                <Link to="/profile" href="#" className="btn btn-default btn-flat">Profile</Link>
                <Link to="/" className="btn btn-default btn-flat float-right" onClick={handleLogout}>Sign out</Link>
              </li>

            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" href="#" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
              <i className="fas fa-th-large" />
            </a>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}

    </>
  );
};
export default MyHeader;
