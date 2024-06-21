import { Link, NavLink } from "react-router-dom";
import ForgetPassword from './../Auth/ForgetPassword';
import { UserContext } from '../../../src/contexts/UserContext';
import React, { useContext } from 'react';
const MyAsideBar = () => {
  const { user } = useContext(UserContext);
  const role = localStorage.getItem('role') || sessionStorage.getItem('role');
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                {user && (
                  <div>
                    Welcome, {user.name}!
                  </div>
                )}
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                {role === '1' ? (
                  <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Dashboard
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">
                      <i className="nav-icon fas fa-th" />
                      <p>
                        Users Report
                      </p>
                    </Link>
                  </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Dashboard
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/workouts/CalendarWorkouts" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Workouts
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/nutrition" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Nutritions
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/progress" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Progress
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Profile" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Profile
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/search" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Search
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/gallery" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Gallery
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact" className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                          Contact
                        </p>
                      </Link>
                    </li>
                  </>
                )}
              </li>


            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </>
  );
};
export default MyAsideBar;
