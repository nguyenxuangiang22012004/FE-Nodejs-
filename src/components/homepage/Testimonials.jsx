import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      img: 'test-1.jpg',
      text: '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."',
      author: 'John D. / DVNTR Inc.'
    },
    {
      id: 2,
      img: 'test-2.jpg',
      text: '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."',
      author: 'John D. / DVNTR Inc.'
    },
    {
      id: 3,
      img: 'test-3.jpg',
      text: '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."',
      author: 'John D. / DVNTR Inc.'
    },
    {
      id: 4,
      img: 'test-4.jpg',
      text: '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."',
      author: 'John D. / DVNTR Inc.'
    }
  ];

  return (
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
          <div className="slider-fouc">
            <div className="owl-carousel" id="testimonial-slider">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial">
                  <div className="testimonial__img-wrap">
                    <img className="testimonial__img" src={`images/about/${testimonial.img}`} alt={testimonial.author} />
                  </div>
                  <div className="testimonial__content-wrap">
                    <span className="testimonial__double-quote"><i className="fas fa-quote-right"></i></span>
                    <blockquote className="testimonial__block-quote">
                      <p>{testimonial.text}</p>
                    </blockquote>
                    <span className="testimonial__author">{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;