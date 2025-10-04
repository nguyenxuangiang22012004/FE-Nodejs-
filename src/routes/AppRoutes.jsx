import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../pages/Homepage";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import LostPassword from "../pages/Lost-password";
import Wishlist from "../pages/Wishlist";
import ShopSide from "../pages/Shopside";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/dashboard/Dashboard";
import DashAddressAdd from "../pages/dashboard/DashAddressAdd";
import DashAddressBook from "../pages/dashboard/DashAddressBook";
import DashAddressEdit from "../pages/dashboard/DashAddressEdit";
import DashAddressMakeDefault from "../pages/dashboard/DashAddressMakeDefault";
import DashCancellation from "../pages/dashboard/DashCancellation";
import DashEditProfile from "../pages/dashboard/DashEditProfile";
import DashManageOrder from "../pages/dashboard/DashManageOrder";
import DashMyOrder from "../pages/dashboard/DashMyOrder";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lostpassword" element={<LostPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shopside" element={<ShopSide />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/dash-address-add" element={<DashAddressAdd />} />
          <Route path="/dashboard/dash-address-book" element={<DashAddressBook />} />
          <Route path="/dashboard/dash-address-edit" element={<DashAddressEdit />} />
          <Route path="/dashboard/dash-address-default" element={<DashAddressMakeDefault />} />
          <Route path="/dashboard/dash-cancellation" element={<DashCancellation />} />
          <Route path="/dashboard/dash-edit-profile" element={<DashEditProfile />} />
          <Route path="/dashboard/dash-manage-order" element={<DashManageOrder />} />
          <Route path="/dashboard/dash-my-order" element={<DashMyOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;