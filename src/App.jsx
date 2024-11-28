import React from 'react';
import AOS from 'aos';
import "aos/dist/aos.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from './pages/Forgerpassword/Forgotpassword';
import ResetPassword from './pages/Forgerpassword/ResetPassword';
import ProfilePage from './pages/profile/Profile';
import User from './pages/profile/User';
import Home from './pages/Home/Home';
import ChangePassword from './pages/profile/ChangePassword';
import FilterProduct from './pages/products/FilterProduct';
import ProductDetail from './pages/products/ProductDetail';
import Authentication from "./pages/Auth/Authentication.jsx";
import Admin from './pages/admin/home/Admin.jsx';
import DashboardAdmin from './pages/admin/dashboard/DashboardAdmin.jsx';
import CategoryManage from './pages/admin/category/CategoryManage.jsx';
import UserManage from './pages/admin/user/UserManage.jsx';
import Profile from './pages/profile/Profile.jsx';
import BrandManage from "./pages/admin/brand/BrandManage.jsx";
import HomePageSeller from "./pages/seller/HomePageSeller.jsx";
import ProductSeller from "./pages/seller/ProductSeller.jsx";
import NewProduct from "./pages/seller/NewProduct.jsx";
import ShoppingCart from './pages/cart/ShoppingCart.jsx';
import ProductDetailSeller from "./pages/seller/ProductDetail.jsx";


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
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                  <Route path="/profile" element={<Profile />} />
                <Route path="/productFilter" element={<FilterProduct/>}/>
                <Route path="/shoppingCart" element={<ShoppingCart />}/>
                <Route path="/productDetail" element={<ProductDetail/>}/>
                <Route path='/authentication' element={<Authentication/>}/>
                <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/> {/* Adjusted to match query param handling */}
                <Route path="/user" element={<User/>}>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                </Route>
                <Route path='/seller' element={<HomePageSeller/>}>
                    <Route path='product' element={<ProductSeller/>}/>
                    <Route path='create-product' element={<NewProduct/>}/>
                    <Route path="product/:productId" element={<ProductDetailSeller />} />
                </Route>
                <Route path="/admin" element={<Admin/>}>
                    <Route path="" element={<DashboardAdmin/>}/>
                    <Route path="category" element={<CategoryManage/>}/>
                    <Route path="brand" element={<BrandManage/>}/>
                    <Route path="user" element={<UserManage/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
