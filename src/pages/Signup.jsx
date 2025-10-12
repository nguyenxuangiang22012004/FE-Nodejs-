import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/AuthService';
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
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    setMessage('');
    setError('');

    try {
      await register(formData); 
      setMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.');
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra khi đăng ký.');
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
                    <Link to="/signup">Signup</Link>
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
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">TẠO TÀI KHOẢN</h1>
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
                    <h1 className="gl-h1">THÔNG TIN CÁ NHÂN</h1>

                    {/* Hiển thị thông báo thành công hoặc lỗi */}
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className="l-f-o__form" onSubmit={handleSubmit}>
                      <div className="gl-s-api">
                        <div className="u-s-m-b-15">
                          <button className="gl-s-api__btn gl-s-api__btn--fb" type="button">
                            <i className="fab fa-facebook-f"></i>
                            <span>Đăng ký với Facebook</span>
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <button className="gl-s-api__btn gl-s-api__btn--gplus" type="button">
                            <i className="fab fa-google"></i>
                            <span>Đăng ký với Google</span>
                          </button>
                        </div>
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">HỌ *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="reg-fname"
                          name="firstName"
                          placeholder="Họ"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-lname">TÊN *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="text"
                          id="reg-lname"
                          name="lastName"
                          placeholder="Tên"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <span className="gl-label">NGÀY SINH</span>
                          <div className="gl-dob">
                            <select
                              className="select-box select-box--primary-style"
                              name="month"
                              onChange={handleDateChange}
                            >
                              <option value="">Tháng</option>
                              <option value="01">Tháng 1</option>
                              <option value="02">Tháng 2</option>
                              <option value="03">Tháng 3</option>
                              <option value="04">Tháng 4</option>
                              <option value="05">Tháng 5</option>
                              <option value="06">Tháng 6</option>
                              <option value="07">Tháng 7</option>
                              <option value="08">Tháng 8</option>
                              <option value="09">Tháng 9</option>
                              <option value="10">Tháng 10</option>
                              <option value="11">Tháng 11</option>
                              <option value="12">Tháng 12</option>
                            </select>
                            <select
                              className="select-box select-box--primary-style"
                              name="day"
                              onChange={handleDateChange}
                            >
                              <option value="">Ngày</option>
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
                              <option value="">Năm</option>
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
                          <label className="gl-label" htmlFor="gender">GIỚI TÍNH</label>
                          <select
                            className="select-box select-box--primary-style u-w-100"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Chọn</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
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
                          placeholder="Nhập E-mail"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-password">MẬT KHẨU *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="reg-password"
                          name="password"
                          placeholder="Nhập Mật Khẩu"
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
                          {loading ? 'Đang xử lý...' : 'TẠO TÀI KHOẢN'}
                        </button>
                      </div>

                      <Link className="gl-link" to="/">
                        Quay lại cửa hàng
                      </Link>
                    </form>
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

export default Signup;