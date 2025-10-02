import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
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
        {/*====== Section Intro ======*/}
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
        {/*====== End - Section Intro ======*/}

        {/*====== Section Content ======*/}
        <div className="section__content">
          <div className="container">
            <div className="row row--center">
              <div className="col-lg-6 col-md-8 u-s-m-b-30">
                <div className="l-f-o">
                  <div className="l-f-o__pad-box">
                    <h1 className="gl-h1">PERSONAL INFORMATION</h1>
                    
                    <form className="l-f-o__form">
                      <div className="gl-s-api">
                        <div className="u-s-m-b-15">
                          <button className="gl-s-api__btn gl-s-api__btn--fb" type="button">
                            <i className="fab fa-facebook-f"></i>
                            <span>Signup with Facebook</span>
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <button className="gl-s-api__btn gl-s-api__btn--gplus" type="button">
                            <i className="fab fa-google"></i>
                            <span>Signup with Google</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-fname">FIRST NAME *</label>
                        <input 
                          className="input-text input-text--primary-style" 
                          type="text" 
                          id="reg-fname" 
                          placeholder="First Name" 
                        />
                      </div>
                      
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-lname">LAST NAME *</label>
                        <input 
                          className="input-text input-text--primary-style" 
                          type="text" 
                          id="reg-lname" 
                          placeholder="Last Name" 
                        />
                      </div>
                      
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          {/*====== Date of Birth Select-Box ======*/}
                          <span className="gl-label">BIRTHDAY</span>
                          <div className="gl-dob">
                            <select className="select-box select-box--primary-style">
                              <option value="">Month</option>
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">March</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">July</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                            <select className="select-box select-box--primary-style">
                              <option value="">Day</option>
                              {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                  {String(i + 1).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                            <select className="select-box select-box--primary-style">
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
                          {/*====== End - Date of Birth Select-Box ======*/}
                        </div>
                        
                        <div className="u-s-m-b-30">
                          <label className="gl-label" htmlFor="gender">GENDER</label>
                          <select className="select-box select-box--primary-style u-w-100" id="gender">
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
                          placeholder="Enter E-mail" 
                        />
                      </div>
                      
                      <div className="u-s-m-b-30">
                        <label className="gl-label" htmlFor="reg-password">PASSWORD *</label>
                        <input 
                          className="input-text input-text--primary-style" 
                          type="password" 
                          id="reg-password" 
                          placeholder="Enter Password" 
                        />
                      </div>
                      
                      <div className="u-s-m-b-15">
                        <button className="btn btn--e-transparent-brand-b-2" type="submit">
                          CREATE
                        </button>
                      </div>
                      
                      <Link className="gl-link" to="/">
                        Return to Store
                      </Link>
                    </form>
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

export default Signup;