import React from 'react';
import AOS from 'aos';
import "aos/dist/aos.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from './pages/Home/Home';
import FilterProduct from './pages/products/FilterProduct';
import ProductDetail from './pages/products/ProductDetail';
import AdminPage from "./pages/admin/AdminPage.jsx";
import CreateCategory from "./components/admin/Category/CreateCategory.jsx";
import Authentication from "./pages/Auth/Authentication.jsx";
import CategoryPage from "./components/admin/Category/CategoryPage.jsx";
import EditCategory from "./components/admin/Category/EditCategory.jsx";
import ForgotPassword from "./pages/Forgerpassword/FotgotPassword.jsx";
import ResetPassword from "./pages/Forgerpassword/ResetPassword.jsx";
import HomePageSeller from "./pages/seller/HomePageSeller.jsx";
import ProductSeller from "./pages/seller/ProductSeller.jsx";
import ProductDetailSeller from "./pages/seller/ProductDetailSeller.jsx";

function App() {
  React.useEffect(() => {
    AOS.init(
      {
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
        offset: 100,
      }
    );
    AOS.refresh()
  }, [])
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
             <Route path="/productFilter" element={<FilterProduct />} />
            <Route path="/productDetail" element={<ProductDetail />} />
            <Route path='/authentication' element={<Authentication />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path="/admin" element={<AdminPage />}>
                <Route path="create-category" element={<CreateCategory />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="edit-category/:id" element={<EditCategory />} />
            </Route>
            <Route path='/seller' element={<HomePageSeller />}>
                <Route path='products' element={<ProductSeller />} />
                <Route path='productDetail/:productId' element={<ProductDetailSeller />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
