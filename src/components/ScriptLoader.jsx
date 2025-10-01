import { useEffect } from 'react';

const ScriptLoader = () => {
  useEffect(() => {
    const loadScriptsSequentially = async () => {
      try {
        // Function to load a script
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };

        // Load scripts in order
        if (!window.jQuery) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');
          console.log('jQuery loaded');
        }

        // Check if vendor.js exists before loading
        try {
          await loadScript('/js/vendor.js');
          console.log('Vendor.js loaded');
        } catch (error) {
          console.warn('Vendor.js not found, skipping...');
        }

        // Load shop navigation plugin
        try {
          await loadScript('/js/jquery.shopnav.js');
          console.log('Shop navigation loaded');
        } catch (error) {
          console.warn('jquery.shopnav.js not found, skipping...');
        }

        // Load main app script
        try {
          await loadScript('/js/app.js');
          console.log('App.js loaded');
        } catch (error) {
          console.warn('app.js not found, skipping...');
        }

      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    // Delay loading to ensure React is fully mounted
    const timer = setTimeout(loadScriptsSequentially, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default ScriptLoader;