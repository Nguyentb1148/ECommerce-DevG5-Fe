import './App.css';
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Profile from "./components/profile/Profile";
import Register from "./pages/Auth/Register";
import ForgotPassword from './pages/Forgerpassword/Forgotpassword';
import ResetPassword from './pages/Forgerpassword/ResetPassword';


function App() {
  return (
      <BrowserRouter>
        <div style={{marginBottom: '50px'}}>
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Adjusted to match query param handling */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
