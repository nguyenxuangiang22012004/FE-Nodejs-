import React, { useEffect, useState } from 'react';
import OrderList from '../../components/dashboard/OrderList';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import { getMyOrders } from '../../services/OrderService';
import Swal from 'sweetalert2';
const DashMyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const limit = 3;

  const fetchOrders = async (currentPage) => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit };
      if (statusFilter) params.status = statusFilter;
      const res = await getMyOrders(params);
      setOrders(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error) {
      Swal.fire("Error", "Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page, statusFilter);
  }, [page, statusFilter]);
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const stats = {
    ordersPlaced: 4,
    canceledOrders: 0,
    wishlist: 0
  };

  return (
    <>
      {/* Section 1 - Breadcrumb */}
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
                    <a href="dash-my-order.html">My Account</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Dashboard Content */}
      <div className="u-s-p-b-60">
        <div className="section__content">
          <div className="dash">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <DashboardSidebar activePage="orders" />
                  <DashboardStats ordersPlaced={orders.length}
                    canceledOrders={orders.filter(o => o.status === 'Cancelled').length}
                    wishlist={0} />
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                    <div className="dash__pad-2">
                      <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>

                      <span className="dash__text u-s-m-b-30">
                        Here you can see all products that have been delivered.
                      </span>

                      {/* Order Filter */}
                      <form className="m-order u-s-m-b-30">
                        <div className="m-order__select-wrapper">
                          <label className="u-s-m-r-8" htmlFor="my-order-status">Status:</label>
                          <select
                            className="select-box select-box--primary-style"
                            id="my-order-status"
                            value={statusFilter}
                            onChange={handleStatusChange}
                          >
                            <option value="">All Orders</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </form>

                      {loading ? (
                        <p>Loading orders...</p>
                      ) : (
                        <>
                          <OrderList orders={orders} />

                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="u-s-p-t-30">
                              <ul className="shop-p__pagination" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                              }}>
                                {/* Previous Button */}
                                <li>
                                  <button
                                    className="shop-p__pagination-button"
                                    disabled={page === 1}
                                    onClick={() => handlePageChange(page - 1)}
                                    style={{
                                      padding: '10px 20px',
                                      border: '1px solid #ddd',
                                      background: page === 1 ? '#f5f5f5' : '#fff',
                                      color: page === 1 ? '#999' : '#333',
                                      cursor: page === 1 ? 'not-allowed' : 'pointer',
                                      borderRadius: '4px',
                                      transition: 'all 0.3s ease',
                                      fontWeight: '500'
                                    }}
                                    onMouseEnter={(e) => {
                                      if (page !== 1) {
                                        e.target.style.background = '#f8f8f8';
                                        e.target.style.borderColor = '#999';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (page !== 1) {
                                        e.target.style.background = '#fff';
                                        e.target.style.borderColor = '#ddd';
                                      }
                                    }}
                                  >
                                    ‹ Prev
                                  </button>
                                </li>

                                {/* Page Numbers */}
                                {(() => {
                                  const pageNumbers = [];
                                  const showEllipsisStart = page > 3;
                                  const showEllipsisEnd = page < totalPages - 2;

                                  // Always show first page
                                  if (totalPages > 0) {
                                    pageNumbers.push(
                                      <li key={1}>
                                        <button
                                          onClick={() => handlePageChange(1)}
                                          style={{
                                            padding: '10px 16px',
                                            border: '1px solid #ddd',
                                            background: page === 1 ? '#ff4500' : '#fff',
                                            color: page === 1 ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            transition: 'all 0.3s ease',
                                            fontWeight: page === 1 ? 'bold' : '500',
                                            minWidth: '44px'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (page !== 1) {
                                              e.target.style.background = '#f8f8f8';
                                              e.target.style.borderColor = '#999';
                                            }
                                          }}
                                          onMouseLeave={(e) => {
                                            if (page !== 1) {
                                              e.target.style.background = '#fff';
                                              e.target.style.borderColor = '#ddd';
                                            }
                                          }}
                                        >
                                          1
                                        </button>
                                      </li>
                                    );
                                  }

                                  // Ellipsis after first page
                                  if (showEllipsisStart) {
                                    pageNumbers.push(
                                      <li key="ellipsis-start" style={{
                                        padding: '10px 8px',
                                        color: '#999',
                                        userSelect: 'none'
                                      }}>
                                        ...
                                      </li>
                                    );
                                  }

                                  // Pages around current page
                                  const startPage = Math.max(2, page - 1);
                                  const endPage = Math.min(totalPages - 1, page + 1);

                                  for (let i = startPage; i <= endPage; i++) {
                                    pageNumbers.push(
                                      <li key={i}>
                                        <button
                                          onClick={() => handlePageChange(i)}
                                          style={{
                                            padding: '10px 16px',
                                            border: '1px solid #ddd',
                                            background: page === i ? '#ff4500' : '#fff',
                                            color: page === i ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            transition: 'all 0.3s ease',
                                            fontWeight: page === i ? 'bold' : '500',
                                            minWidth: '44px'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (page !== i) {
                                              e.target.style.background = '#f8f8f8';
                                              e.target.style.borderColor = '#999';
                                            }
                                          }}
                                          onMouseLeave={(e) => {
                                            if (page !== i) {
                                              e.target.style.background = '#fff';
                                              e.target.style.borderColor = '#ddd';
                                            }
                                          }}
                                        >
                                          {i}
                                        </button>
                                      </li>
                                    );
                                  }

                                  // Ellipsis before last page
                                  if (showEllipsisEnd) {
                                    pageNumbers.push(
                                      <li key="ellipsis-end" style={{
                                        padding: '10px 8px',
                                        color: '#999',
                                        userSelect: 'none'
                                      }}>
                                        ...
                                      </li>
                                    );
                                  }

                                  // Always show last page
                                  if (totalPages > 1) {
                                    pageNumbers.push(
                                      <li key={totalPages}>
                                        <button
                                          onClick={() => handlePageChange(totalPages)}
                                          style={{
                                            padding: '10px 16px',
                                            border: '1px solid #ddd',
                                            background: page === totalPages ? '#ff4500' : '#fff',
                                            color: page === totalPages ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            borderRadius: '4px',
                                            transition: 'all 0.3s ease',
                                            fontWeight: page === totalPages ? 'bold' : '500',
                                            minWidth: '44px'
                                          }}
                                          onMouseEnter={(e) => {
                                            if (page !== totalPages) {
                                              e.target.style.background = '#f8f8f8';
                                              e.target.style.borderColor = '#999';
                                            }
                                          }}
                                          onMouseLeave={(e) => {
                                            if (page !== totalPages) {
                                              e.target.style.background = '#fff';
                                              e.target.style.borderColor = '#ddd';
                                            }
                                          }}
                                        >
                                          {totalPages}
                                        </button>
                                      </li>
                                    );
                                  }

                                  return pageNumbers;
                                })()}

                                {/* Next Button */}
                                <li>
                                  <button
                                    className="shop-p__pagination-button"
                                    disabled={page === totalPages}
                                    onClick={() => handlePageChange(page + 1)}
                                    style={{
                                      padding: '10px 20px',
                                      border: '1px solid #ddd',
                                      background: page === totalPages ? '#f5f5f5' : '#fff',
                                      color: page === totalPages ? '#999' : '#333',
                                      cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                      borderRadius: '4px',
                                      transition: 'all 0.3s ease',
                                      fontWeight: '500'
                                    }}
                                    onMouseEnter={(e) => {
                                      if (page !== totalPages) {
                                        e.target.style.background = '#f8f8f8';
                                        e.target.style.borderColor = '#999';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (page !== totalPages) {
                                        e.target.style.background = '#fff';
                                        e.target.style.borderColor = '#ddd';
                                      }
                                    }}
                                  >
                                    Next ›
                                  </button>
                                </li>
                              </ul>

                              {/* Page Info */}
                              <div style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                fontSize: '14px',
                                color: '#666',
                                fontWeight: '400'
                              }}>
                                Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashMyOrder;