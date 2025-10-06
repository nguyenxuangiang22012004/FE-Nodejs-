import React from 'react';

const AboutBreadcrumb = () => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__wrap">
        <ul className="breadcrumb__list">
          <li className="has-separator">
            <a href="index.html">Home</a>
          </li>
          <li className="is-marked">
            <a href="about.html">About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutBreadcrumb;