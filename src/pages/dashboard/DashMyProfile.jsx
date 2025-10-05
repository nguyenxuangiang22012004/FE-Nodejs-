import React from 'react';
import { Link } from 'react-router-dom';

const DashMyProfile = () => {
  // Dữ liệu người dùng mẫu
  const [user, setUser] = React.useState({
    fullName: 'John Doe',
    email: 'johndoe@domain.com',
    phone: 'Please enter your mobile',
    birthday: '1991-02-02',
    gender: 'Male'
  });

  const [stats, setStats] = React.useState({
    ordersPlaced: 4,
    cancelOrders: 0,
    wishlist: 0
  });

  return (
    <>
      {/* Section 1 - Breadcrumb */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="is-marked">
                    <Link to="/dash-my-profile">My Account</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Dashboard Content */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                {/* Sidebar */}
                <div className="col-lg-3 col-md-12">
                  {/* Dashboard Features */}
                  <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                    <div className="dash__pad-1">
                      <span className="dash__text u-s-m-b-16">Hello, {user.fullName}</span>
                      <ul className="dash__f-list">
                        <li><Link to="/dashboard">Manage My Account</Link></li>
                        <li><Link className="dash-active" to="/dash-my-profile">My Profile</Link></li>
                        <li><Link to="/dash-address-book">Address Book</Link></li>
                        <li><Link to="/dash-track-order">Track Order</Link></li>
                        <li><Link to="/dash-my-order">My Orders</Link></li>
                        <li><Link to="/dash-payment-option">My Payment Options</Link></li>
                        <li><Link to="/dash-cancellation">My Returns & Cancellations</Link></li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Stats Widget */}
                  <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                    <div className="dash__pad-1">
                      <ul className="dash__w-list">
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-1">
                              <i className="fas fa-cart-arrow-down"></i>
                            </span>
                            <span className="dash__w-text">{stats.ordersPlaced}</span>
                            <span className="dash__w-name">Orders Placed</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-2">
                              <i className="fas fa-times"></i>
                            </span>
                            <span className="dash__w-text">{stats.cancelOrders}</span>
                            <span className="dash__w-name">Cancel Orders</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-3">
                              <i className="far fa-heart"></i>
                            </span>
                            <span className="dash__w-text">{stats.wishlist}</span>
                            <span className="dash__w-name">Wishlist</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">My Profile</h1>
                      <span className="dash__text u-s-m-b-30">
                        Look all your info, you could customize your profile.
                      </span>
                      
                      <div className="row">
                        <div className="col-lg-4 u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Full Name</h2>
                          <span className="dash__text">{user.fullName}</span>
                        </div>
                        <div className="col-lg-4 u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">E-mail</h2>
                          <span className="dash__text">{user.email}</span>
                          <div className="dash__link dash__link--secondary">
                            <Link to="#">Change</Link>
                          </div>
                        </div>
                        <div className="col-lg-4 u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Phone</h2>
                          <span className="dash__text">{user.phone}</span>
                          <div className="dash__link dash__link--secondary">
                            <Link to="#">Add</Link>
                          </div>
                        </div>
                        <div className="col-lg-4 u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Birthday</h2>
                          <span className="dash__text">{user.birthday}</span>
                        </div>
                        <div className="col-lg-4 u-s-m-b-30">
                          <h2 className="dash__h2 u-s-m-b-8">Gender</h2>
                          <span className="dash__text">{user.gender}</span>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="dash__link dash__link--secondary u-s-m-b-30">
                            <Link to="#" data-modal="modal" data-modal-id="#dash-newsletter">
                              Subscribe Newsletter
                            </Link>
                          </div>
                          <div className="u-s-m-b-16">
                            <Link 
                              className="dash__custom-link btn--e-transparent-brand-b-2" 
                              to="/dash-edit-profile"
                            >
                              Edit Profile
                            </Link>
                          </div>
                          <div>
                            <Link 
                              className="dash__custom-link btn--e-brand-b-2" 
                              to="#"
                            >
                              Change Password
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashMyProfile;