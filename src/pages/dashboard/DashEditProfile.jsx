import React from 'react';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';

const DashEditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated');
  };

  return (
    <>
      {/*====== Section 1 - Breadcrumb ======*/}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="dash-edit-profile.html">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 1 ======*/}

      {/*====== Section 2 - Edit Profile Content ======*/}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  {/*====== Dashboard Features ======*/}
                  <DashboardSidebar />
                  {/* <DashboardStats /> */}
                  {/*====== End - Dashboard Features ======*/}
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Edit Profile</h1>
                      <span className="dash__text u-s-m-b-30">
                        Looks like you haven't update your profile
                      </span>
                      <div className="dash__link dash__link--secondary u-s-m-b-30">
                        <a data-modal="modal" data-modal-id="#dash-newsletter">
                          Subscribe Newsletter
                        </a>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <form className="dash-edit-p" onSubmit={handleSubmit}>
                            <div className="gl-inline">
                              <div className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reg-fname">
                                  FIRST NAME *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="text"
                                  id="reg-fname"
                                  placeholder="John"
                                />
                              </div>
                              <div className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reg-lname">
                                  LAST NAME *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="text"
                                  id="reg-lname"
                                  placeholder="Doe"
                                />
                              </div>
                            </div>
                            <div className="gl-inline">
                              <div className="u-s-m-b-30">
                                {/*====== Date of Birth Select-Box ======*/}
                                <span className="gl-label">BIRTHDAY</span>
                                <div className="gl-dob">
                                  <select className="select-box select-box--primary-style">
                                    <option value="">Month</option>
                                    <option value="january">January</option>
                                    <option value="february">February</option>
                                    <option value="march">March</option>
                                    <option value="april">April</option>
                                  </select>
                                  <select className="select-box select-box--primary-style">
                                    <option value="">Day</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                  </select>
                                  <select className="select-box select-box--primary-style">
                                    <option value="">Year</option>
                                    <option value="1991">1991</option>
                                    <option value="1992">1992</option>
                                    <option value="1993">1993</option>
                                    <option value="1994">1994</option>
                                  </select>
                                </div>
                                {/*====== End - Date of Birth Select-Box ======*/}
                              </div>
                              <div className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="gender">
                                  GENDER
                                </label>
                                <select
                                  className="select-box select-box--primary-style u-w-100"
                                  id="gender"
                                >
                                  <option value="">Select</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div className="gl-inline">
                              <div className="u-s-m-b-30">
                                <h2 className="dash__h2 u-s-m-b-8">E-mail</h2>
                                <span className="dash__text">
                                  johndoe@domain.com
                                </span>
                                <div className="dash__link dash__link--secondary">
                                  <a href="#">Change</a>
                                </div>
                              </div>
                              <div className="u-s-m-b-30">
                                <h2 className="dash__h2 u-s-m-b-8">Phone</h2>
                                <span className="dash__text">
                                  Please enter your mobile
                                </span>
                                <div className="dash__link dash__link--secondary">
                                  <a href="#">Add</a>
                                </div>
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
          </div>
        </div>
      </div>
      {/*====== End - Section 2 ======*/}
    </>
  );
};

export default DashEditProfile;