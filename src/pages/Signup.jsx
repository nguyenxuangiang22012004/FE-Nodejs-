import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/AuthService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const [year, month, day] = (formData.birthday || '').split('-');
    const updated = { year, month, day, [name]: value };
    const birthdayString = `${updated.year || ''}-${updated.month || ''}-${updated.day || ''}`;
    setFormData({ ...formData, birthday: birthdayString });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful 🎉',
        text: 'Please check your email to verify your account.',
        confirmButtonColor: '#52c41a',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed ❌',
        text: err.message || 'An error occurred during registration.',
        confirmButtonColor: '#ff4d4f',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*====== Section 1 ======*/} 
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
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*====== Section 2 ======*/} 
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">CREATE AN ACCOUNT</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section__content">
          <div className="container">
            <div className="row row--center">
              <div className="col-lg-6 col-md-8 u-s-m-b-30">
                <div className="l-f-o">
                  <div className="l-f-o__pad-box">
                    <h1 className="gl-h1">PERSONAL INFORMATION</h1>

                    <form className="l-f-o__form" onSubmit={handleSubmit}>
                      {/* Social buttons */}
                      <div className="gl-s-api">
                        <div className="u-s-m-b-15">
                          <button className="gl-s-api__btn gl-s-api__btn--fb" type="button">
                            <i className="fab fa-facebook-f"></i>
                            <span>Sign up with Facebook</span>
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <button className="gl-s-api__btn gl-s-api__btn--gplus" type="button">
                            <i className="fab fa-google"></i>
                            <span>Sign up with Google</span>
                          </button>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">FIRST NAME *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="reg-fname"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-lname">LAST NAME *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="reg-lname"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* Birthday & gender */}
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <span className="gl-label">DATE OF BIRTH</span>
                          <div className="gl-dob">
                            <select
                              className="select-box select-box--primary-style"
                              name="month"
                              onChange={handleDateChange}
                            >
                              <option value="">Month</option>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                  {new Date(0, i).toLocaleString('en', { month: 'long' })}
                                </option>
                              ))}
                            </select>
                            <select
                              className="select-box select-box--primary-style"
                              name="day"
                              onChange={handleDateChange}
                            >
                              <option value="">Day</option>
                              {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                  {String(i + 1).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                            <select
                              className="select-box select-box--primary-style"
                              name="year"
                              onChange={handleDateChange}
                            >
                              <option value="">Year</option>
                              {Array.from({ length: 100 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="u-s-m-b-30">
                          <label className="gl-label" htmlFor="gender">GENDER</label>
                          <select
                            className="select-box select-box--primary-style u-w-100"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-email">E-MAIL *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="email"
                          id="reg-email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-password">PASSWORD *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="reg-password"
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-15">
                        <button
                          className="btn btn--e-transparent-brand-b-2"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Processing...' : 'CREATE ACCOUNT'}
                        </button>
                      </div>

                      <Link className="gl-link" to="/">
                        Back to Shop
                      </Link>
                    </form>
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

export default Signup;
