import React, { useState } from 'react';

const ProductImages = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Dữ liệu mẫu nếu không có images truyền vào
  const defaultImages = [
    { id: 1, url: '/images/product/product-d-1.jpg', alt: 'Nikon Camera - View 1' },
    { id: 2, url: '/images/product/product-d-2.jpg', alt: 'Nikon Camera - View 2' },
    { id: 3, url: '/images/product/product-d-3.jpg', alt: 'Nikon Camera - View 3' },
    { id: 4, url: '/images/product/product-d-4.jpg', alt: 'Nikon Camera - View 4' },
    { id: 5, url: '/images/product/product-d-5.jpg', alt: 'Nikon Camera - View 5' },
  ];

  const productImages = images.length > 0 ? images : defaultImages;

  const handlePrevious = () => {
    setSelectedImage((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ paddingBottom: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={productImages[selectedImage].url}
            alt={productImages[selectedImage].alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Previous image"
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Next image"
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Image Counter */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '14px'
        }}>
          {selectedImage + 1} / {productImages.length}
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div className="relative">
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          {productImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              style={{
                flexShrink: 0,
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: selectedImage === index ? '2px solid #3b82f6' : '2px solid #d1d5db',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedImage === index ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : 'none',
                padding: 0,
                background: 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedImage !== index) {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Thumb';
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductImages;