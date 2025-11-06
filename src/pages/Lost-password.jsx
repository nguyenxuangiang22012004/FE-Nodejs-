import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { requestPasswordReset } from '../services/AuthService';
import Swal from 'sweetalert2';

const LostPassword = () => {
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', link: '/', hasSeparator: true },
    { label: 'Reset', link: '/lost-password', isMarked: true },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');

    if (!email.trim()) {
      setFieldError('Email không được để trống');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('Email không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      setEmail('');

      await Swal.fire({
        icon: 'success',
        title: 'Gửi thành công 🎉',
        text: res.message || 'Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư của bạn.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      console.error('Lỗi reset password:', err);
      Swal.fire({
        icon: 'error',
        title: 'Thất bại 😢',
        text: err.message || 'Không thể gửi yêu cầu. Vui lòng thử lại sau.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-content">
      {/* Section 1 - Breadcrumb */}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
      </div>

      {/* Section 2 - Reset Password Form */}
      <div className="u-s-p-b-60">
        {/* Section Intro */}
        <div className="section__intro u-s-m-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">FORGOT PASSWORD?</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="section__content">
          <div className="container">
            <div className="row row--center">
              <div className="col-lg-6 col-md-8 u-s-m-b-30">
                <div className="l-f-o">
                  <div className="l-f-o__pad-box">
                    <h1 className="gl-h1">PASSWORD RESET</h1>

                    <span className="gl-text u-s-m-b-30">
                      Enter your email or username below and we will send you a link to reset your password.
                    </span>

                    <form className="l-f-o__form" onSubmit={handleSubmit}>
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reset-email">
                          E-MAIL *
                        </label>
                        <input
                          className="input-text input-text--primary-style"
                          type="email"
                          id="reset-email"
                          placeholder="Enter E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {fieldError && <p className="error-text">{fieldError}</p>}
                      </div>

                      <div className="u-s-m-b-30">
                        <button
                          className="btn btn--e-transparent-brand-b-2"
                          type="submit"
                        >
                          SUBMIT
                        </button>
                      </div>

                      <div className="u-s-m-b-30">
                        <Link className="gl-link" to="/signin">
                          Back to Login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .error-text {
          color: #e53935;
          font-size: 13px;
          margin-top: 5px;
        }
      `}</style>


    </div>
  );
};

export default LostPassword;