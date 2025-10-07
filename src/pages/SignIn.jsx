import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService'; // Import hàm login

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Xử lý đăng nhập bằng email/mật khẩu
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // Chuyển hướng về trang chủ với query parameter để kích hoạt reload
      navigate('/?reload=true');
    } catch (err) {
      setError(err.message);
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
                    <Link to="/signin">Signin</Link>
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
                      <Link className="l-f-o__create-link btn--e-transparent-brand-b-2" to="/signup">
                        CREATE AN ACCOUNT
                      </Link>
                    </div>

                    <h1 className="gl-h1">SIGNIN</h1>
                    <span className="gl-text u-s-m-b-30">
                      If you have an account with us, please log in.
                    </span>

                    {error && (
                      <div className="u-s-m-b-15">
                        <span className="gl-text u-c-danger">{error}</span>
                      </div>
                    )}

                    <form className="l-f-o__form" onSubmit={handleLogin}>
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
                          <Link className="gl-link" to="/lost-password">
                            Lost Your Password?
                          </Link>
                        </div>
                      </div>

                      <div className="u-s-m-b-30">
                        <div className="check-box">
                          <input type="checkbox" id="remember-me" />
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
    </>
  );
};

export default SignIn;