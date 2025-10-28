import React, { useEffect, useState } from "react";
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { useLocation } from 'react-router-dom';
import { updateUserProfile } from "../../services/DashboardService";

const DashEditProfile = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    birthday: userData?.birthday || '',
    gender: userData?.gender || '',
  });

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await updateUserProfile(formData);
      window.alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      window.alert("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý tách birthday (nếu cần)
  const date = new Date(formData.birthday);
  const year = date.getFullYear() || "";
  const month = date.getMonth() + 1 || "";
  const day = date.getDate() || "";

  return (
    <>
      {/*====== Breadcrumb ======*/}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="/">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="#">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*====== Edit Profile ======*/}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <DashboardSidebar />
                </div>

                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Edit Profile</h1>
                      <span className="dash__text u-s-m-b-30">
                        Update your personal information
                      </span>

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
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleChange}
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
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <span className="gl-label">BIRTHDAY</span>
                            <div className="gl-dob">
                              <input
                                className="input-text input-text--primary-style"
                                type="date"
                                name="birthday"
                                value={formData.birthday?.split('T')[0] || ''}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="gender">
                              GENDER
                            </label>
                            <select
                              className="select-box select-box--primary-style u-w-100"
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-email">
                              E-MAIL *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="email"
                              id="reg-email"
                              name="email"
                              placeholder="johndoe@domain.com"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-phone">
                              PHONE
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="reg-phone"
                              name="phoneNumber"
                              placeholder="Please enter your mobile"
                              value={formData.phoneNumber}
                              onChange={handleChange}
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
      </div>
    </>
  );
};

export default DashEditProfile;
