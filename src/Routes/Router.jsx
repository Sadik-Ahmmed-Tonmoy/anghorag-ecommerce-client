import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import OtpVerification from "../pages/OtpVerification/OtpVerification";
import Main from "../Layout/Main/Main";
import Category from "../pages/Category/Category";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderConfirmed from "../pages/OrderConfirmed/OrderConfirmed";
import MyAccount from "../Layout/MyAccount/MyAccount";
import Active from "../pages/MyAccount/MyOrder/Active/Active";
import Completed from "../pages/MyAccount/MyOrder/Completed/Completed";
import OrderDetails from "../pages/MyAccount/MyOrder/OrderDetails/OrderDetails";
import Addresses from "../pages/MyAccount/Addresses/Addresses";
import EditAddresses from "../pages/MyAccount/Addresses/EditAddresses/EditAddresses";
import ViewInfo from "../pages/MyAccount/PersonalInfo/ViewInfo/ViewInfo";
import EditInfo from "../pages/MyAccount/PersonalInfo/EditInfo/EditInfo";
import SingleProduct from "../Layout/SingleProduct/SingleProduct";
import ProductDescription from "../pages/SingleProduct/ProductDescription/ProductDescription";
import HowToUse from "../pages/SingleProduct/HowToUse/HowToUse";
import Ingredients from "../pages/SingleProduct/Ingredients/Ingredients";
import Reviews from "../pages/SingleProduct/Reviews/Reviews";
import ReturnPolicy from "../pages/SingleProduct/ReturnPolicy/ReturnPolicy";
import Campaign from "../pages/Campaign/Campaign";
import OffersPage from "../pages/OffersPage/OffersPage";
import Support from "../pages/Support/Support";
import CheckoutAndRegister from "../pages/CheckoutAndRegister/CheckoutAndRegister";
import SellerPicksPageForAllProducts from "../pages/SellerPicksPageForAllProducts/SellerPicksPageForAllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/product/:slug",
      //   element: <SingleProduct />,
      // },
      {
        path: "/support/:id",
        element: <Support />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/seller-picks-products",
        element: <SellerPicksPageForAllProducts />,
      },
      {
        path: "/category/:category",
        element: <Category />,
      },
      {
        path: "/category/:category/:subItem",
        element: <Category />,
      },
      {
        path: "/category/:category/:subItem/:subSubItem",
        element: <Category />,
      },
      {
        path: "/campaign/:id",
        element: <OffersPage />,
      },
      {
        path: "/sellerPicks",
        element: <OffersPage />,
      },
      {
        path: "/offers",
        element: <OffersPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/checkout/register",
        element: <CheckoutAndRegister />,
      },
      {
        path: "/order-confirmed/:order",
        element: <OrderConfirmed />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/otpVerification",
        element: <OtpVerification />,
      },
    ],
  },
  {
    path: "/product/:slug/:campaign_id",
    element: <SingleProduct />,
  },
  {
    path: "/product/:slug",
    element: <SingleProduct />,
    //   errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/product/:slug",
    //     element: <SingleProduct />,
    //   },
    //   {
    //     path: "/product/:slug/product_description",
    //     element: <SingleProduct />,
    //   },
    //   {
    //     path: "/product/:slug/description",
    //     element: <ProductDescription />,
    //   },
    //   {
    //     path: "/product/:slug/how-to-use",
    //     element: <HowToUse />,
    //   },
    //   {
    //     path: "/product/:slug/ingredients",
    //     element: <Ingredients />,
    //   },
    //   {
    //     path: "/product/:slug/reviews",
    //     element: <Reviews />,
    //   },
    //   {
    //     path: "/product/:slug/return-policy",
    //     element: <ReturnPolicy />,
    //   },
    // ],
  },
  
  {
    path: "/my-account",
    element: <MyAccount />,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/my-account/order/active",
        element: <Active />,
      },
      {
        path: "/my-account/order/completed",
        element: <Completed />,
      },
      {
        path: "/my-account/active/order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "/my-account/completed/order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "/my-account/addresses/view",
        element: <Addresses />,
      },
      {
        path: "/my-account/addresses/edit",
        element: <EditAddresses />,
      },
      {
        path: "/my-account/personal-info/view",
        element: <ViewInfo />,
      },
      {
        path: "/my-account/personal-info/edit",
        element: <EditInfo />,
      },
    ],
  },
]);
