import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";

import './Main.css';
import Footer from "../../Shared/Footer/Footer";
const Main = () => {
    const location = useLocation()
    const isLogin = location.pathname.includes('login')
    const isSignup = location.pathname.includes('signup')
    const isForgotPassword = location.pathname.includes('forgotPassword')
    const isOtpVerification = location.pathname.includes('otpVerification')
    return (
        <div className="bg-white text-black">
           {isLogin || isSignup || isForgotPassword || isOtpVerification || <Navbar/>}
            <Outlet/>
           {isLogin || isSignup || isForgotPassword || isOtpVerification || <Footer/>}
            <ScrollRestoration/>
        </div>
    );
};

export default Main;