import React from 'react';
import AboutBreadcrumb from '../components/about/AboutBreadcrumb';
import AboutWelcome from '../components/about/AboutWelcome';
import TeamMembers from '../components/about/TeamMembers';
import ClientFeedback from '../components/about/ClientFeedback';

const About = () => {
  return (
    <>
      {/*====== Section 1 - Breadcrumb ======*/}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <AboutBreadcrumb />
          </div>
        </div>
      </div>
      {/*====== End - Section 1 ======*/}

      {/*====== Section 2 - Welcome Content ======*/}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <AboutWelcome />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 2 ======*/}

      {/*====== Section 3 - Team Members ======*/}
      <div className="u-s-p-b-60">
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">Our Team Members</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section__content">
          <div className="container">
            <TeamMembers />
          </div>
        </div>
      </div>
      {/*====== End - Section 3 ======*/}

      {/*====== Section 4 - Client Feedback ======*/}
      <div className="u-s-p-b-90 u-s-m-b-30">
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">CLIENTS FEEDBACK</h1>
                  <span className="section__span u-c-silver">WHAT OUR CLIENTS SAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section__content">
          <div className="container">
            <ClientFeedback />
          </div>
        </div>
      </div>
      {/*====== End - Section 4 ======*/}
    </>
  );
};

export default About;