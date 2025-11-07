import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useParams } from "react-router-dom";
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import { getUserAddressById } from "../../services/AddressService";
import Swal from "sweetalert2";

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
  map.setView(center, 16);
  return null;
}

// Component để handle click trên map
function MapClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

const DashAddressEdit = ({ addressId }) => {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    houseNumber: '',
    street: '',
    address: '',
    city: '',
    state: '',
    country: 'Việt Nam'
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 21.028511,
    lng: 105.804817,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('address-', '');
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const loadAddress = async () => {
      try {
        setIsLoading(true);
        
        
        if (!id) {
          throw new Error('Không tìm thấy ID địa chỉ');
        }

        const res = await getUserAddressById(id);
        const address = res.data;
        let houseNumber = '';
        let fullAddress = address.location || '';
        
        if (address.location && address.location.includes(',')) {
          const parts = address.location.split(',');
          houseNumber = parts[0].trim();
          fullAddress = parts.slice(1).join(',').trim();
        }

        setFormData({
          firstName: address.firstName || '',
          lastName: address.lastName || '',
          phoneNumber: address.phoneNumber || '',
          houseNumber: houseNumber,
          street: address.street || fullAddress.split(',')[0] || '',
          address: fullAddress,
          city: address.city || '',
          state: address.state || '',
          country: address.country || 'Việt Nam'
        });

        // Nếu có tọa độ, cập nhật vị trí bản đồ
        if (address.latitude && address.longitude) {
          setSelectedLocation({
            lat: parseFloat(address.latitude),
            lng: parseFloat(address.longitude)
          });
        }
      } catch (error) {
        console.error('Error loading address:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Không thể tải thông tin địa chỉ.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAddress();
  }, [addressId]);

  // Debounce search khi nhập tên đường
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchAddress(searchQuery);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `countrycodes=vn&` +
        `format=json&` +
        `addressdetails=1&` +
        `limit=8&` +
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
    const addressParts = result.display_name.split(',');
    const streetName = addressParts[0].trim();

    setFormData(prev => ({
      ...prev,
      street: streetName,
      address: result.display_name,
      city: result.address?.city || result.address?.town || result.address?.village || '',
      state: result.address?.state || result.address?.province || '',
      country: result.address?.country || 'Việt Nam'
    }));

    setSelectedLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    });

    setSearchQuery('');
    setShowSuggestions(false);
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullAddress = formData.houseNumber
      ? `${formData.houseNumber}, ${formData.address || formData.street}`
      : formData.address || formData.street;

    const id = addressId || new URLSearchParams(window.location.search).get('id');

    const payload = {
      ...formData,
      location: fullAddress,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };

    try {
      const res = await updateUserAddress(id, payload);
      Swal.fire({
        icon: "success",
        title: "Đã cập nhật!",
        text: "Cập nhật địa chỉ thành công.",
        timer: 2000,
        showConfirmButton: false,
      });

      console.log("📦 Address updated:", res);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: err.message || "Không thể cập nhật địa chỉ, vui lòng thử lại.",
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <p>Đang tải thông tin địa chỉ...</p>
      </div>
    );
  }

  return (
    <>
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="is-marked">
                    <a href="dash-address-edit.html">My Account</a>
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
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <DashboardSidebar activePage="address-book" />
                  <DashboardStats />
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">Edit Address</h1>
                      <span className="dash__text u-s-m-b-30">
                        We need an address where we could deliver products.
                      </span>

                      <div className="dash-address-manipulation">
                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-firstName">
                              FIRST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-firstName"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-lastName">
                              LAST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-lastName"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="gl-inline">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-phoneNumber">
                              PHONE *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-phoneNumber"
                              placeholder="Phone"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="address-houseNumber">
                              SỐ NHÀ
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="address-houseNumber"
                              placeholder="Ví dụ: 69, 123A, ..."
                              value={formData.houseNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        {/* Tìm kiếm tên đường */}
                        <div className="u-s-m-b-30" style={{ position: 'relative' }}>
                          <label className="gl-label" htmlFor="search-street">
                            TÌM KIẾM TÊN ĐƯỜNG/PHỐ *
                          </label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            id="search-street"
                            placeholder="Nhập tên đường, phố để tìm kiếm..."
                            value={searchQuery}
                            onChange={(e) => handleSearchQueryChange(e.target.value)}
                            autoComplete="off"
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

                              {!isSearching && searchResults.length === 0 && searchQuery.length > 2 && (
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

                        {/* Hiển thị địa chỉ đã chọn */}
                        {formData.address && (
                          <div className="u-s-m-b-30">
                            <label className="gl-label">ĐỊA CHỈ ĐÃ CHỌN</label>
                            <div style={{
                              padding: '12px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '4px',
                              border: '1px solid #e0e0e0'
                            }}>
                              <strong>
                                {formData.houseNumber && `${formData.houseNumber}, `}
                                {formData.address}
                              </strong>
                            </div>
                          </div>
                        )}

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
                              <MapClickHandler setPosition={setSelectedLocation} />
                            </MapContainer>
                          </div>
                        </div>
                        {/* 🗺️ END MAP SECTION */}

                        <button 
                          className="btn btn--e-brand-b-2" 
                          type="button"
                          onClick={handleSubmit}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 2 ======*/}
    </>
  );
};

export default DashAddressEdit;