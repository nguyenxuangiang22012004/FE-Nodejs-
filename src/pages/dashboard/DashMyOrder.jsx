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
  const limit = 5;

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
                  <DashboardStats />
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
                            <div className="u-s-p-t-30 d-flex justify-content-center align-items-center">
                              <button
                                className="btn btn--e-transparent-brand-b-2 u-s-m-r-8"
                                disabled={page === 1}
                                onClick={() => handlePageChange(page - 1)}
                              >
                                Prev
                              </button>
                              <span>
                                Page {page} of {totalPages}
                              </span>
                              <button
                                className="btn btn--e-transparent-brand-b-2 u-s-m-l-8"
                                disabled={page === totalPages}
                                onClick={() => handlePageChange(page + 1)}
                              >
                                Next
                              </button>
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