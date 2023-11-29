import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Component/Logo';
import LogoMini from '../Component/Logo-mini';

const Sidebar = ({ sidebar }) => {
  return (
    <>
      <div className={sidebar?"sidebar-wrapper active":"sidebar-wrapper"}>
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
              <div className='sidebar-logo'>
                  <Link to="/">
                      <Logo />
                      <LogoMini />
                  </Link>
              </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-item">
                <NavLink to="/Home" className='sidebar-link'>
                  <i className='bx bxs-home'></i>
                  <span>Dashboard</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/tags" className='sidebar-link'>
                  <i className='bx bxs-purchase-tag'></i>
                  <span>Tags</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/plan" className='sidebar-link'>
                  <i className='bx bxs-notepad' ></i>
                  <span>Plan</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/exercises" className='sidebar-link'>
                  <i className='bx bx-dumbbell' ></i>
                  <span>Exercises</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/planLevels" className='sidebar-link'>
                  <i className='bx bx-sort-up' ></i>
                  <span>Plan Levels</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/languages" className='sidebar-link'>
                  <i className='bx bx-world' ></i>
                  <span>Languages</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/configuration" className='sidebar-link'>
                  <i className='bx bxs-lock-open'></i>
                  <span>Configuration</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/categories" className='sidebar-link'>
                  <i className='bx bxs-grid-alt' ></i>
                  <span>Categories</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/sounds" className='sidebar-link'>
                  <i className='bx bxs-music' ></i>
                  <span>Sounds</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/poseslists" className='sidebar-link'>
                  <i className='bx bx-list-ul' ></i>
                  <span>Poses Lists</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/userdata" className='sidebar-link'>
                  <i className='bx bxs-user-circle' ></i>
                  <span>User Data</span>
                </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar