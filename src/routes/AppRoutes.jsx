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
import Dashboard from "../pages/Dashboard";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;