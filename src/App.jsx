import React from 'react';
import AOS from 'aos';
import "aos/dist/aos.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from './pages/Home/Home';
import AdminPage from "./pages/admin/AdminPage.jsx";
import CreateCategory from "./components/admin/Category/CreateCategory.jsx";
import Authentication from "./pages/Auth/Authentication.jsx";
import CategoryPage from "./components/admin/Category/CategoryPage.jsx";
import EditCategory from "./components/admin/Category/EditCategory.jsx";

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
            <Route path='/authentication' element={<Authentication />} />
            <Route path="/admin" element={<AdminPage />}>
                <Route path="create-category" element={<CreateCategory />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="edit-category/:id" element={<EditCategory />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
