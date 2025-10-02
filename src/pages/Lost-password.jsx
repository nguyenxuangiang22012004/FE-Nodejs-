import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

const LostPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', email);
  };

  const breadcrumbItems = [
    { label: 'Home', link: '/', hasSeparator: true },
    { label: 'Reset', link: '/lost-password', isMarked: true }
  ];

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
      </div>
  );
};

export default LostPassword;