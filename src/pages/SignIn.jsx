import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, loginWithGoogle, loginWithFacebook } from '../services/AuthService';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SignIn = () => {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (location.state?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error ❌',
        text: location.state.error,
      });
    }
  }, [location]);

  // 🔹 Validate form trước khi login
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email không được để trống';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Email không hợp lệ';

    if (!password.trim()) newErrors.password = 'Mật khẩu không được để trống';

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);

      // Hiển thị Swal thông báo lỗi tổng quát
      Swal.fire({
        icon: 'warning',
        title: 'Validation Failed ⚠️',
        html: `
          <ul style="text-align:left; margin:0; padding:0 20px;">
            ${Object.values(newErrors)
              .map((err) => `<li>${err}</li>`)
              .join('')}
          </ul>
        `,
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    if (!validateForm()) return; // ⛔ dừng nếu validate lỗi

    setLoading(true);
    try {
      const user = await login(email, password);
      window.dispatchEvent(new Event('auth-changed'));
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Welcome back! 🎉',
      //   text: `Đăng nhập thành công.`,
      //   timer: 1500,
      //   showConfirmButton: false,
      // });
      navigate('/?reload=true', { replace: true });
    } catch (err) {
      console.error('Login error:', err);

      if (err.field) {
        setFieldErrors((prev) => ({ ...prev, [err.field]: err.message }));
      }

      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại ❌',
        text: err.message || 'Email hoặc mật khẩu không đúng.',
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google login
  const handleGoogleLogin = () => {
    try {
      setLoading(true);
      loginWithGoogle();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed ❌',
        text: err.message || 'Không thể đăng nhập bằng Google',
      });
      setLoading(false);
    }
  };

  // 🔹 Facebook login
  const handleFacebookLogin = () => {
    try {
      setLoading(true);
      loginWithFacebook();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Facebook Login Failed ❌',
        text: err.message || 'Không thể đăng nhập bằng Facebook',
      });
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
                    <Link to="/login">Signin</Link>
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
                  <h1 className="section__heading u-c-secondary">ALREADY REGISTERED?</h1>
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
                    <h1 className="gl-h1">I'M NEW CUSTOMER</h1>
                    <span className="gl-text u-s-m-b-30">
                      By creating an account with our store, you will be able to move through the checkout process faster,
                      store shipping addresses, view and track your orders in your account and more.
                    </span>
                    <div className="u-s-m-b-15">
                      <Link className="l-f-o__create-link btn--e-transparent-brand-b-2" to="/register">
                        CREATE AN ACCOUNT
                      </Link>
                    </div>

                    <h1 className="gl-h1">SIGNIN</h1>
                    <span className="gl-text u-s-m-b-30">
                      If you have an account with us, please log in.
                    </span>

                    <form className="l-f-o__form" onSubmit={handleLogin}>
                      {/* Social Login Buttons */}
                      <div className="gl-s-api">
                        <div className="u-s-m-b-15">
                          <button
                            className="gl-s-api__btn gl-s-api__btn--fb"
                            type="button"
                            onClick={handleFacebookLogin}
                            disabled={loading}
                          >
                            <i className="fab fa-facebook-f"></i>
                            <span>Signin with Facebook</span>
                          </button>
                        </div>
                        <div className="u-s-m-b-15">
                          <button
                            className="gl-s-api__btn gl-s-api__btn--gplus"
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                          >
                            <i className="fab fa-google"></i>
                            <span>Signin with Google</span>
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="u-s-m-b-30">
                        <div className="gl-divider">
                          <span className="gl-divider__text">OR</span>
                        </div>
                      </div>

                      {/* Email and Password Form */}
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="login-email">E-MAIL *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="email"
                          id="login-email"
                          placeholder="Enter E-mail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        {fieldErrors.email && (
                          <p className="error-text">{fieldErrors.email}</p>
                        )}

                      </div>

                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="login-password">PASSWORD *</label>
                        <input
                          className="input-text input-text--primary-style"
                          type="password"
                          id="login-password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        {fieldErrors.password && (
                          <p className="error-text">{fieldErrors.password}</p>
                        )}
                      </div>

                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <button
                            className="btn btn--e-transparent-brand-b-2"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? 'LOADING...' : 'LOGIN'}
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <Link className="gl-link" to="/lostpassword">
                            Lost Your Password?
                          </Link>
                        </div>
                      </div>

                      <div className="u-s-m-b-30">
                        <div className="check-box">
                          <input
                            type="checkbox"
                            id="remember-me"
                          />
                          <div className="check-box__state check-box__state--primary">
                            <label className="check-box__label" htmlFor="remember-me">
                              Remember Me
                            </label>
                          </div>
                        </div>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 2 ======*/}

      {/* CSS cho divider */}
      <style jsx>{`
        .gl-divider {
          position: relative;
          text-align: center;
          margin: 20px 0;
        }
        
        .gl-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e0e0e0;
        }
        
        .gl-divider__text {
          background: white;
          padding: 0 15px;
          color: #666;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }
          .error-text {
  color: #e53935;
  font-size: 13px;
  margin-top: 5px;
}
  .alert {
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 10px;
  font-weight: 500;
}

.alert-danger {
  background-color: #ffe5e5;
  color: #b30000;
  border: 1px solid #ffb3b3;
}
  
      `}</style>
    </>
  );
};

export default SignIn;