import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix cho icon marker mặc định của Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component để cập nhật center của map
function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

const DashAddressAdd = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    country: '',
    state: '',
    city: '',
    postalCode: ''
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 21.028511,
    lng: 105.804817, // Hà Nội mặc định
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id.replace('address-', '')]: value,
    }));

    // Nếu là input street address thì search
    if (id === 'address-street') {
      handleAddressSearch(value);
    }
  };

  // Debounce function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.street.length > 2) {
        searchAddress(formData.street);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.street]);

  const handleAddressSearch = (value) => {
    if (value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSearchResults([]);
    }
  };

  // Search địa chỉ qua Nominatim API (OpenStreetMap)
  const searchAddress = async (query) => {
    if (!query || query.length < 3) return;

    setIsSearching(true);
    try {
      // Giới hạn search trong Việt Nam
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `countrycodes=vn&` + // Chỉ tìm ở Việt Nam
        `format=json&` +
        `addressdetails=1&` +
        `limit=5&` +
        `accept-language=vi`
      );
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching address:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Chọn địa chỉ từ gợi ý
  const handleSelectAddress = (result) => {
    const fullAddress = result.display_name;
    
    setFormData(prev => ({
      ...prev,
      street: fullAddress
    }));
    
    setSelectedLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    });
    
    setSelectedAddress(fullAddress);
    setShowSuggestions(false);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { 
      ...formData, 
      selectedLocation,
      fullAddress: selectedAddress || formData.street
    });
  };

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
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="dash-address-add.html">My Account</a>
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
        {/*====== Section Content ======*/}
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  {/*====== Dashboard Features ======*/}
                  <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                    <div className="dash__pad-1">
                      <span className="dash__text u-s-m-b-16">Hello, John Doe</span>
                      <ul className="dash__f-list">
                        <li>
                          <a href="dashboard.html">Manage My Account</a>
                        </li>
                        <li>
                          <a href="dash-my-profile.html">My Profile</a>
                        </li>
                        <li>
                          <a className="dash-active" href="dash-address-book.html">Address Book</a>
                        </li>
                        <li>
                          <a href="dash-track-order.html">Track Order</a>
                        </li>
                        <li>
                          <a href="dash-my-order.html">My Orders</a>
                        </li>
                        <li>
                          <a href="dash-payment-option.html">My Payment Options</a>
                        </li>
                        <li>
                          <a href="dash-cancellation.html">My Returns & Cancellations</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                    <div className="dash__pad-1">
                      <ul className="dash__w-list">
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-1">
                              <i className="fas fa-cart-arrow-down"></i>
                            </span>
                            <span className="dash__w-text">4</span>
                            <span className="dash__w-name">Orders Placed</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-2">
                              <i className="fas fa-times"></i>
                            </span>
                            <span className="dash__w-text">0</span>
                            <span className="dash__w-name">Cancel Orders</span>
                          </div>
                        </li>
                        <li>
                          <div className="dash__w-wrap">
                            <span className="dash__w-icon dash__w-icon-style-3">
                              <i className="far fa-heart"></i>
                            </span>
                            <span className="dash__w-text">0</span>
                            <span className="dash__w-name">Wishlist</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*====== End - Dashboard Features ======*/}
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Add new Address</h1>
                      <span className="dash__text u-s-m-b-30">
                        We need an address where we could deliver products.
                      </span>

                      <form className="dash-address-manipulation" onSubmit={handleSubmit}>
                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-fname">
                              FIRST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-fname"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-lname">
                              LAST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-lname"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-phone">
                              PHONE *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30" style={{ position: 'relative' }}>
                            <label className="gl-label" htmlFor="address-street">
                              STREET ADDRESS * (Nhập để tìm kiếm)
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-street"
                              placeholder="Nhập địa chỉ để tìm kiếm..."
                              value={formData.street}
                              onChange={handleInputChange}
                              autoComplete="off"
                              required
                            />
                            
                            {/* Dropdown gợi ý địa chỉ */}
                            {showSuggestions && (
                              <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                                zIndex: 1000,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                marginTop: '5px'
                              }}>
                                {isSearching && (
                                  <div style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                                    Đang tìm kiếm...
                                  </div>
                                )}
                                
                                {!isSearching && searchResults.length === 0 && formData.street.length > 2 && (
                                  <div style={{ padding: '15px', textAlign: 'center', color: '#999' }}>
                                    Không tìm thấy địa chỉ
                                  </div>
                                )}
                                
                                {!isSearching && searchResults.map((result, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleSelectAddress(result)}
                                    style={{
                                      padding: '12px 15px',
                                      cursor: 'pointer',
                                      borderBottom: index < searchResults.length - 1 ? '1px solid #eee' : 'none',
                                      transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    <div style={{ fontWeight: '500', marginBottom: '4px', fontSize: '14px' }}>
                                      {result.display_name.split(',')[0]}
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                      {result.display_name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 🗺️ LEAFLET MAP SECTION */}
                        <div className="u-s-m-b-30">
                          <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                            <MapContainer
                              center={[selectedLocation.lat, selectedLocation.lng]}
                              zoom={13}
                              style={{ height: '100%', width: '100%' }}
                            >
                              <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              />
                              <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
                              <ChangeMapView center={[selectedLocation.lat, selectedLocation.lng]} />
                            </MapContainer>
                          </div>
                        </div>
                        {/* 🗺️ END MAP SECTION */}

                        <button className="btn btn--e-brand-b-2" type="submit">
                          SAVE
                        </button>
                      </form>
                    </div>
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

export default DashAddressAdd;