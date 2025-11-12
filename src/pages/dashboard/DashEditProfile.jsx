import React, { useEffect, useState } from "react";
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { useLocation } from 'react-router-dom';
import { updateUserProfile, getUserProfile } from "../../services/DashboardService";
import DashboardStats from '../../components/dashboard/DashboardStats';
import Swal from 'sweetalert2';

const DashEditProfile = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        birthday: userData.birthday || "",
        gender: userData.gender || "",
      });
    } else {
      (async () => {
        const res = await getUserProfile();
        if (res?.success) {
          setFormData(res.data);
        }
      })();
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi nếu user sửa lại
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phoneNumber && !/^[0-9]{8,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 8–15 digits";
    }

    if (formData.birthday && new Date(formData.birthday) > new Date()) {
      newErrors.birthday = "Birthday cannot be in the future";
    }

    if (formData.gender && !["male", "female"].includes(formData.gender)) {
      newErrors.gender = "Please select a valid gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Invalid form!",
        text: "Please fix the highlighted fields.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await updateUserProfile(formData);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  <DashboardStats />
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
                              className={`input-text input-text--primary-style ${errors.firstName ? "border-danger" : ""}`}
                              type="text"
                              id="reg-fname"
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName || ""}
                              onChange={handleChange}
                            />
                            {errors.firstName && (
                              <span className="text-danger small">{errors.firstName}</span>
                            )}
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-lname">
                              LAST NAME *
                            </label>
                            <input
                              className={`input-text input-text--primary-style ${errors.lastName ? "border-danger" : ""}`}
                              type="text"
                              id="reg-lname"
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName || ""}
                              onChange={handleChange}
                            />
                            {errors.lastName && (
                              <span className="text-danger small">{errors.lastName}</span>
                            )}
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <span className="gl-label">BIRTHDAY</span>
                            <div className="gl-dob">
                              <input
                                className={`input-text input-text--primary-style ${errors.birthday ? "border-danger" : ""}`}
                                type="date"
                                name="birthday"
                                value={formData.birthday?.split('T')[0] || ''}
                                onChange={handleChange}
                              />
                            </div>
                            {errors.birthday && (
                              <span className="text-danger small">{errors.birthday}</span>
                            )}
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="gender">
                              GENDER
                            </label>
                            <select
                              className={`select-box select-box--primary-style u-w-100 ${errors.gender ? "border-danger" : ""}`}
                              id="gender"
                              name="gender"
                              value={formData.gender || ""}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                            {errors.gender && (
                              <span className="text-danger small">{errors.gender}</span>
                            )}
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-email">
                              E-MAIL *
                            </label>
                            <input
                              className={`input-text input-text--primary-style ${errors.email ? "border-danger" : ""}`}
                              type="email"
                              id="reg-email"
                              name="email"
                              placeholder="johndoe@domain.com"
                              value={formData.email || ""}
                              onChange={handleChange}
                            />
                            {errors.email && (
                              <span className="text-danger small">{errors.email}</span>
                            )}
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-phone">
                              PHONE
                            </label>
                            <input
                              className={`input-text input-text--primary-style ${errors.phoneNumber ? "border-danger" : ""}`}
                              type="text"
                              id="reg-phone"
                              name="phoneNumber"
                              placeholder="Please enter your mobile"
                              value={formData.phoneNumber || ""}
                              onChange={handleChange}
                            />
                            {errors.phoneNumber && (
                              <span className="text-danger small">{errors.phoneNumber}</span>
                            )}
                          </div>
                        </div>

                        <button 
                          className="btn btn--e-brand-b-2" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "SAVING..." : "SAVE"}
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
