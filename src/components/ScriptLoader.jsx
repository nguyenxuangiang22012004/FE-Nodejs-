import React, { useEffect } from 'react';

const ScriptLoader = () => {
  useEffect(() => {
    // Initialize any third-party scripts here
    const initializeScripts = () => {
      console.log('Initializing scripts...');

      // Check if jQuery is available
      if (typeof window.jQuery === 'undefined') {
        console.warn('jQuery is not available. Loading jQuery dynamically...');
        loadjQuery();
        return;
      }

      initializeZoomAndSliders();
    };

    const loadjQuery = () => {
      // Load jQuery from CDN
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
      jqueryScript.crossOrigin = 'anonymous';
      
      jqueryScript.onload = () => {
        console.log('jQuery loaded successfully');
        loadElevateZoom();
      };
      
      jqueryScript.onerror = () => {
        console.error('Failed to load jQuery');
      };

      document.body.appendChild(jqueryScript);
    };

    const loadElevateZoom = () => {
      // Load elevateZoom plugin
      const elevateZoomScript = document.createElement('script');
      elevateZoomScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/elevatezoom/3.0.8/jquery.elevatezoom.min.js';
      
      elevateZoomScript.onload = () => {
        console.log('ElevateZoom loaded successfully');
        // Wait a bit for scripts to initialize
        setTimeout(() => {
          initializeZoomAndSliders();
        }, 100);
      };
      
      elevateZoomScript.onerror = () => {
        console.error('Failed to load ElevateZoom');
        initializeZoomAndSliders(); // Continue without elevateZoom
      };

      document.body.appendChild(elevateZoomScript);
    };

    const initializeZoomAndSliders = () => {
      const $ = window.jQuery || window.$;
      
      if (!$) {
        console.warn('jQuery not available for initialization');
        return;
      }

      console.log('Initializing zoom and sliders with jQuery version:', $?.fn?.jquery);

      // 1. First, initialize product image zoom
      initializeProductZoom($);

      // 2. Then initialize Owl Carousels
      initializeOwlCarousels($);

      // 3. Initialize other functionalities
      initializeOtherFeatures();
    };

    const initializeProductZoom = ($) => {
      const productZoom = document.getElementById('pd-o-initiate');
      
      if (productZoom) {
        console.log('Found product zoom element');

        // Check if elevateZoom is available
        if ($.fn.elevateZoom) {
          try {
            $('#pd-o-initiate').ezPlus({
              gallery: 'pd-o-thumbnail',
              cursor: 'pointer',
              galleryActiveClass: 'active',
              imageCrossfade: true,
              loadingIcon: '/images/preloader.gif',
              zoomType: "inner",
              scrollZoom: true
            });
            console.log('ElevateZoom initialized successfully');
          } catch (error) {
            console.warn('ElevateZoom initialization failed:', error);
            // Fallback to simple zoom
            initializeSimpleZoom();
          }
        } else {
          console.warn('ElevateZoom plugin not available');
          initializeSimpleZoom();
        }

        // Initialize thumbnail carousel
        const thumbnailCarousel = document.getElementById('pd-o-thumbnail');
        if (thumbnailCarousel && $.fn.owlCarousel) {
          try {
            $('#pd-o-thumbnail').owlCarousel({
              items: 4,
              margin: 20,
              nav: true,
              navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
              dots: false,
              responsive: {
                0: { items: 2 },
                576: { items: 3 },
                768: { items: 4 }
              }
            });
            console.log('Thumbnail carousel initialized');
          } catch (error) {
            console.warn('Thumbnail carousel initialization failed:', error);
          }
        }
      }
    };

    const initializeSimpleZoom = () => {
      // Simple CSS-based zoom fallback
      console.log('Using simple zoom fallback');
      const style = document.createElement('style');
      style.textContent = `
        .pd-wrap { position: relative; overflow: hidden; }
        .pd-o-img-wrap { transition: transform 0.3s ease; cursor: zoom-in; }
        .pd-o-img-wrap:hover { transform: scale(1.8); z-index: 1000; }
        .pd-text { display: block; text-align: center; margin-top: 10px; }
      `;
      document.head.appendChild(style);
    };

    const initializeOwlCarousels = ($) => {
      if (!$.fn.owlCarousel) {
        console.warn('OwlCarousel not available');
        return;
      }

      // Hero Slider
      const heroSlider = document.getElementById('hero-slider');
      if (heroSlider) {
        $('#hero-slider').owlCarousel({
          items: 1,
          loop: true,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 5000
        });
        console.log('Hero slider initialized');
      }

      // Product Slider
      const productSlider = document.querySelector('.product-slider');
      if (productSlider) {
        $('.product-slider').owlCarousel({
          items: 4,
          loop: true,
          nav: true,
          dots: false,
          margin: 30,
          responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 }
          }
        });
        console.log('Product slider initialized');
      }

      // Testimonial Slider
      const testimonialSlider = document.getElementById('testimonial-slider');
      if (testimonialSlider) {
        $('#testimonial-slider').owlCarousel({
          items: 1,
          loop: true,
          nav: true,
          dots: true
        });
        console.log('Testimonial slider initialized');
      }

      // Brand Slider
      const brandSlider = document.getElementById('brand-slider');
      if (brandSlider) {
        $('#brand-slider').owlCarousel({
          items: 5,
          loop: true,
          nav: false,
          dots: false,
          margin: 30,
          responsive: {
            0: { items: 2 },
            576: { items: 3 },
            768: { items: 4 },
            992: { items: 5 }
          }
        });
        console.log('Brand slider initialized');
      }
    };

    const initializeOtherFeatures = () => {
      // Countdown initialization
      const countdowns = document.querySelectorAll('.countdown');
      countdowns.forEach(countdown => {
        console.log('Countdown initialized:', countdown);
      });

      // Filter functionality
      const filterButtons = document.querySelectorAll('.filter__btn');
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          const filterValue = this.getAttribute('data-filter');
          console.log('Filter:', filterValue);
        });
      });

      // Modal functionality
      const modalButtons = document.querySelectorAll('[data-modal]');
      modalButtons.forEach(button => {
        button.addEventListener('click', function() {
          const modalId = this.getAttribute('data-modal-id');
          console.log('Modal triggered:', modalId);
        });
      });
    };

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeScripts);
    } else {
      // If DOM is already loaded, initialize immediately
      setTimeout(initializeScripts, 100);
    }

    // Cleanup function
    return () => {
      console.log('Cleaning up scripts...');
      const $ = window.jQuery || window.$;
      
      if ($) {
        try {
          // Destroy owl carousels
          $('.owl-carousel').trigger('destroy.owl.carousel');
          
          // Destroy elevateZoom instances
          $('[data-zoom-image]').each(function() {
            const ez = $(this).data('ezPlus');
            if (ez) {
              ez.destroy();
            }
          });
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      }
    };
  }, []);

  return null;
};

export default ScriptLoader;