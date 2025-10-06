import React from 'react';

const ClientFeedback = () => {
  const testimonials = [
    {
      id: 1,
      image: "images/about/test-1.jpg",
      text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
      author: "John D. / DVNTR Inc."
    },
    {
      id: 2,
      image: "images/about/test-2.jpg",
      text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
      author: "John D. / DVNTR Inc."
    },
    {
      id: 3,
      image: "images/about/test-3.jpg",
      text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
      author: "John D. / DVNTR Inc."
    },
    {
      id: 4,
      image: "images/about/test-4.jpg",
      text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
      author: "John D. / DVNTR Inc."
    }
  ];

  return (
    <div className="slider-fouc">
      <div className="owl-carousel" id="testimonial-slider">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial">
            <div className="testimonial__img-wrap">
              <img className="testimonial__img" src={testimonial.image} alt="" />
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
  );
};

export default ClientFeedback;