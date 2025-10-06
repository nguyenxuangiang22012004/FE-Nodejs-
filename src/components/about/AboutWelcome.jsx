import React from 'react';

const AboutWelcome = () => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__info">
          <h2 className="about__h2">Welcome to Reshop Store!</h2>
          <div className="about__p-wrap">
            <p className="about__p">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book. It has survived not only five centuries, but also the leap into 
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
          <a className="about__link btn--e-secondary" href="index.html" target="_blank">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutWelcome;