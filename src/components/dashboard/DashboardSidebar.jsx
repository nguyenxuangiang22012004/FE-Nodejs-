import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = ({ activePage }) => {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.lastName || "User";
   const linkItems = [
    { to: "/dashboard/", label: "Manage My Account", key: "dashboard" },
    { to: "/dashboard/dash-my-profile", label: "My Profile", key: "profile" },
    { to: "/dashboard/dash-address-book", label: "Address Book", key: "address-book" },
    { to: "/dashboard/dash-track-order", label: "Track Order", key: "track-order" },
    { to: "/dashboard/dash-my-order", label: "My Orders", key: "my-orders" },
    { to: "/dashboard/dash-payment-option", label: "My Payment Options", key: "payment-option" },
    { to: "/dashboard/dash-cancellation", label: "My Returns & Cancellations", key: "cancellation" },
  ];
  return (
    <>
       <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
        <div className="dash__pad-1">
          <span className="dash__text u-s-m-b-16">Hello, {userName}</span>
          <ul className="dash__f-list">
            {linkItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive || activePage === item.key ? "dash-active" : ""
                  }
                  end
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
        <div className="dash__pad-1">
          <ul className="dash__w-list">
            <li>
              <div className="dash__w-wrap">
                <span className="dash__w-icon dash__w-icon-style-1">
                  <i className="fas fa-cart-arrow-down"></i>
                </span>
                <span className="dash__w-text">4</span>
                <span className="dash__w-name">Orders Placed</span>
              </div>
            </li>
            <li>
              <div className="dash__w-wrap">
                <span className="dash__w-icon dash__w-icon-style-2">
                  <i className="fas fa-times"></i>
                </span>
                <span className="dash__w-text">0</span>
                <span className="dash__w-name">Cancel Orders</span>
              </div>
            </li>
            <li>
              <div className="dash__w-wrap">
                <span className="dash__w-icon dash__w-icon-style-3">
                  <i className="far fa-heart"></i>
                </span>
                <span className="dash__w-text">0</span>
                <span className="dash__w-name">Wishlist</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/*====== End - Dashboard Features ======*/}
    </>
  );
};

export default DashboardSidebar;