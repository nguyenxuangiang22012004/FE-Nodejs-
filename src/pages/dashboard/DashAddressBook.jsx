import React, { useState, useEffect } from "react";
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import DashboardStats from '../../components/dashboard/DashboardStats';
import { getUserAddresses, setDefaultAddress ,deleteUserAddress  } from "../../services/AddressService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const DashAddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await getUserAddresses();
                console.log(res.data);
                setAddresses(res.data || []);
            } catch (err) {
                console.error("Lỗi khi tải địa chỉ:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    const handleDefaultChange = async (id) => {
        try {
            await setDefaultAddress(id);
            setAddresses((prev) =>
                prev.map((addr) => ({
                    ...addr,
                    isDefault: addr.id === id,
                }))
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteAddress = async (id) => {
        const confirm = await Swal.fire({
            title: "Bạn có chắc muốn xoá?",
            text: "Thao tác này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xoá",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
            try {
                await deleteUserAddress(id);
                setAddresses((prev) => prev.filter((addr) => addr.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Đã xoá địa chỉ thành công!",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: "error",
                    title: "Xoá địa chỉ thất bại!",
                });
            }
        }
    };
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
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="is-marked">
                                        <a href="#">My Account</a>
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
                                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                                        <div className="dash__pad-2">
                                            <div className="dash__address-header">
                                                <h1 className="dash__h1">Address Book</h1>
                                                <div>
                                                    <span className="dash__link dash__link--black">
                                                        <a href="/dashboard/dash-address-add">Add New Address</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                                        <div className="dash__table-2-wrap gl-scroll">
                                            <table className="dash__table-2">
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Is Default</th>
                                                        <th>Full Name</th>
                                                        <th>Address</th>
                                                        <th>Phone Number</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {addresses.map((addr) => (
                                                        <tr key={addr.id}>
                                                            <td>
                                                                <Link
                                                                    className="address-book-edit btn--e-transparent-platinum-b-2"
                                                                    to={`/dashboard/dash-address-edit/${addr.id}`}
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={addr.isDefault}
                                                                    onChange={() => handleDefaultChange(addr.id)}
                                                                />
                                                            </td>
                                                            <td>{`${addr.firstName || ""} ${addr.lastName || ""}`.trim()}</td>
                                                            <td>{addr.location}</td>
                                                            <td>{addr.phoneNumber}</td>
                                                            <td>
                                                                <button
                                                                    onClick={() => handleDeleteAddress(addr.id)}
                                                                    className="btn--e-transparent-platinum-b-2"
                                                                    title="Delete address"
                                                                    style={{
                                                                        color: "red",
                                                                        border: "none",
                                                                        background: "transparent",
                                                                        cursor: "pointer",
                                                                        fontSize: "18px",
                                                                    }}
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div>
                                        <a className="dash__custom-link btn--e-brand-b-2" href="/dashboard/dash-address-add">
                                            <i className="fas fa-plus u-s-m-r-8"></i>
                                            <span>Add New Address</span>
                                        </a>
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

export default DashAddressBook;
