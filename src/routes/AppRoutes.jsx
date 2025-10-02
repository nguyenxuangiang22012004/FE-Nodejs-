import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Homepage from "../pages/Homepage";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import LostPassword from "../pages/Lost-password";
import Wishlist from "../pages/Wishlist";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;