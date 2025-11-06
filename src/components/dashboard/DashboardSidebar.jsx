import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const DashboardSidebar = ({ activePage }) => {
  return (
    <>
      {/*====== Dashboard Features ======*/}
      <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
        <div className="dash__pad-1">
          <span className="dash__text u-s-m-b-16">
            Hello, {JSON.parse(localStorage.getItem("user"))?.firstName || "User"} {JSON.parse(localStorage.getItem("user"))?.lastName || ""}
          </span>
          <ul className="dash__f-list">
            <li>
              <Link className={activePage === 'dashboard' ? 'dash-active' : ''} to="/dashboard">
                Manage My Account
              </Link>
            </li>
            <li>
              <Link className={activePage === 'profile' ? 'dash-active' : ''} to="/dashboard/dash-my-profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className={activePage === 'address-book' ? 'dash-active' : ''} to="/dashboard/dash-address-book">
                Address Book
              </Link>
            </li>
            <li>
              <Link className={activePage === 'track-order' ? 'dash-active' : ''} to="/dashboard/dash-track-order">
                Track Order
              </Link>
            </li>
            <li>
              <Link className={activePage === 'orders' ? 'dash-active' : ''} to="/dashboard/dash-my-order">
                My Orders
              </Link>
            </li>
            <li>
              <Link className={activePage === 'payment' ? 'dash-active' : ''} to="/dashboard/dash-payment-option">
                My Payment Options
              </Link>
            </li>
            <li>
              <Link className={activePage === 'cancellation' ? 'dash-active' : ''} to="/dashboard/dash-cancellation">
                My Returns & Cancellations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;