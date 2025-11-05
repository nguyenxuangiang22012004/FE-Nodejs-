import React, { useState } from 'react';

const DashAddressAdd = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id.replace('address-', '')]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <>
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-60">
        {/*====== Section Content ======*/}
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="dash-address-add.html">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 1 ======*/}

      {/*====== Section 2 ======*/}
      <div className="u-s-p-b-60">
        {/*====== Section Content ======*/}
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  {/*====== Dashboard Features ======*/}
                  <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                    <div className="dash__pad-1">
                      <span className="dash__text u-s-m-b-16">Hello, John Doe</span>
                      <ul className="dash__f-list">
                        <li>
                          <a href="dashboard.html">Manage My Account</a>
                        </li>
                        <li>
                          <a href="dash-my-profile.html">My Profile</a>
                        </li>
                        <li>
                          <a className="dash-active" href="dash-address-book.html">Address Book</a>
                        </li>
                        <li>
                          <a href="dash-track-order.html">Track Order</a>
                        </li>
                        <li>
                          <a href="dash-my-order.html">My Orders</a>
                        </li>
                        <li>
                          <a href="dash-payment-option.html">My Payment Options</a>
                        </li>
                        <li>
                          <a href="dash-cancellation.html">My Returns & Cancellations</a>
                        </li>
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
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Add new Address</h1>
                      <span className="dash__text u-s-m-b-30">
                        We need an address where we could deliver products.
                      </span>
                      <form className="dash-address-manipulation" onSubmit={handleSubmit}>
                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-fname">
                              FIRST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-fname"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-lname">
                              LAST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-lname"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-phone">
                              PHONE *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-street">
                              STREET ADDRESS *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-street"
                              placeholder="House Name and Street"
                              value={formData.street}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <button className="btn btn--e-brand-b-2" type="submit">
                          SAVE
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== End - Section 2 ======*/}
    </>
  );
};

export default DashAddressAdd;