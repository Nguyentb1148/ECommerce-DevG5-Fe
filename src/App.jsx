import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import ResetPassword from "./components/password/ResetPassword.jsx";
import Home from "./pages/Home/Home";
import FilterProduct from "./pages/products/FilterProduct";
import ProductDetail from "./pages/products/ProductDetail";
import Admin from "./pages/admin/home/Admin.jsx";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin.jsx";
import CategoryManage from "./pages/admin/category/CategoryManage.jsx";
import UserManage from "./pages/admin/user/UserManage.jsx";
import Profile from "./pages/profile/Profile.jsx";
import BrandManage from "./pages/admin/brand/BrandManage.jsx";
import OrdersManage from "./pages/seller/order/OrderManage.jsx";
import VoucherManage from "./pages/seller/voucher/VoucherManage.jsx";
import ShoppingCart from "./pages/cart/ShoppingCart.jsx";
import Seller from "./pages/seller/home/Seller.jsx";
import ProductManage from "./pages/seller/product/ProductManage.jsx";
import AuthForm from "./pages/Auth/AuthForm.jsx";
import ProductManagement from "./pages/admin/product/ProductManage.jsx"; // Import the new ProductManagement page

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productFilter" element={<FilterProduct />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/authentication" element={<AuthForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/seller" element={<Seller />}>
          <Route path="product" element={<ProductManage />} />
          <Route path="voucher" element={<VoucherManage />} />
          <Route path="orders" element={<OrdersManage />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<DashboardAdmin />} />
          <Route path="category" element={<CategoryManage />} />
          <Route path="brand" element={<BrandManage />} />
          <Route path="user" element={<UserManage />} />
          <Route path="product-management" element={<ProductManagement />} /> {/* Add the new route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;