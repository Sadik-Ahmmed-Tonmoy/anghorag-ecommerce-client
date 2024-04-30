import React, { useEffect, useState } from "react";
import { NavLink, ScrollRestoration, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Card from "../../components/Card/Card";
import ProductDescription from "../../pages/SingleProduct/ProductDescription/ProductDescription";

import useSingleProduct from "../../hooks/useSingleProduct";
import HowToUse from "../../pages/SingleProduct/HowToUse/HowToUse";
import Ingredients from "../../pages/SingleProduct/Ingredients/Ingredients";
import ReturnPolicy from "../../pages/SingleProduct/ReturnPolicy/ReturnPolicy";
import Reviews from "../../pages/SingleProduct/Reviews/Reviews";
import SingleProductsSlider from "./SingleProductsSlider/SingleProductsSlider";

const SingleProduct = () => {
    //
    // const isHome = location.pathname.includes("product_description");
    const queryString = window.location.search;

    // product image start
    const [currentIndex, setCurrentIndex] = useState(0);
    //
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [nav3, setNav3] = useState(null);

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
        setNav3(slider3);
    }, []);

    let slider1, slider2, slider3;

    const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentIndex(newIndex);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
        // setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        setIsModalVisible(true);
    };

    const handleMouseLeave = () => {
        setIsModalVisible(false);
    };

    const handleMouseMove = (e) => {
        setPosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        });
    };
    // product image end

    // style with screen width (media queries alternative way)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const customStyle = {
        transform: `translate(calc(72.5% - ${position.x}px), calc(60% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.5, 2.2)`,
    };

    if (windowWidth <= 1023) {
        customStyle.transform = `translate(calc(110% - ${position.x}px), calc(115% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(3.3, 3.30)`;
    } else if (windowWidth <= 1279) {
        customStyle.transform = `translate(calc(72% - ${position.x}px), calc(75% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.5)`;
    } else if (windowWidth <= 1535) {
        customStyle.transform = `translate(calc(72.5% - ${position.x}px), calc(65% - ${position.y}px)) translate(-${position.x}px, -${position.y}px) scale(2.4, 2.3)`;
    }
    // style with screen width (media queries alternative way)

    // const [singleProductData, setSingleProductData] = useState([])
    //
    // useEffect(() => {
    //   // axios.get(`get_single_products/${16}`)
    //   axios.get(`get_single_products/nobis-maxime-quidem-non-praesentium-ratione?pagination=3`)
    //     .then(response => {
    //       // Handle the response data here
    //       setSingleProductData(response?.data?.data);
    //     })
    //     .catch(error => {
    //       // Handle any errors here
    //       console.error('Error fetching data:', error);
    //     });
    // }, [
    //   // searchValue
    // ]);

    const [activeTab, setActiveTab] = useState("product_description");
    useEffect(() => {
        if (queryString.includes("?")) {
            setActiveTab(queryString);
        }
    }, [queryString]);

    const { slug } = useParams();
    //

    // const slug = "nobis-maxime-quidem-non-praesentium-ratione?pagination=3"
    const { singleProduct, isLoading, refetch } = useSingleProduct(slug);

    return (
        <div className="bg-white text-black overflow-hidden">
            <Navbar />
            <div className="container mx-auto px-2 ">
                <div className="mt-2">
                    <Breadcrumbs />
                </div>
                <span>
                    {isLoading ? (
                        <div className=" flex justify-center min-h-[calc(100vh-50vh)] ">
                            <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                        </div>
                    ) : (
                        <SingleProductsSlider singleProduct={singleProduct} isLoading={isLoading} />
                    )}
                </span>
                <div className="p-4 bg-[#FFF1F4] border-[#FFF1F4] flex gap-2 rounded-t-lg">
                    <div className="border-[3px] border-[#F40F6F] rounded-[12px] h-auto w-0"></div>
                    <p className="text-base md:text-lg font-semibold">Product details of {singleProduct?.data?.products?.name}</p>
                </div>
                <div className="relative mb-10 md:mb-20 border-x-[1px] border-b-[1px] border-[#BFBFBF]">
                    <div className="w-full  absolute top-[46px] md:top-[61.5px] border-b-[1px] border-[#BFBFBF]"></div>
                    <div className="overflow-x-auto pb-2" style={{ scrollbarColor: "#F40F6F" }}>
                        <div className=" flex md:pb-0 items-center justify-between px-[1%] md:px-[5%] pt-4 md:pt-8">
                            <NavLink
                                className={() =>
                                    queryString === "?product_description" || activeTab === "product_description"
                                        ? "border-b-2 border-[#F40F6F] text-[#F40F6F] pb-2 px-1 text-sm font-semibold hover:cursor-pointer"
                                        : "border-b-2 border-white font-medium pb-2 px-1 text-sm hover:cursor-pointer "
                                }
                                to={`/product/${slug}?product_description`}
                            >
                                <span
                                    onClick={() => setActiveTab("product_description")}
                                    className=" whitespace-nowrap border-b-2 border-white font-medium px-1"
                                >
                                    Product Description
                                </span>
                            </NavLink>
                            <NavLink
                                className={() =>
                                    queryString === "?how-to-use"
                                        ? "border-b-2 border-[#F40F6F] text-[#F40F6F] pb-2 px-1 text-sm font-semibold hover:cursor-pointer"
                                        : "border-b-2 border-white font-medium pb-2 px-1 text-sm hover:cursor-pointer"
                                }
                                to={`/product/${slug}?how-to-use`}
                            >
                                <span
                                    onClick={() => setActiveTab("how_to_use")}
                                    className=" whitespace-nowrap border-b-2 border-white font-medium px-1"
                                >
                                    How To Use
                                </span>
                            </NavLink>
                            <NavLink
                                className={() =>
                                    queryString === "?ingredients"
                                        ? "border-b-2 border-[#F40F6F] text-[#F40F6F] pb-2 px-1 text-sm font-semibold hover:cursor-pointer"
                                        : "border-b-2 border-white font-medium pb-2 px-1 text-sm hover:cursor-pointer"
                                }
                                to={`/product/${slug}?ingredients`}
                            >
                                <span
                                    onClick={() => setActiveTab("ingredients")}
                                    className=" whitespace-nowrap border-b-2 border-white font-medium px-1"
                                >
                                    Ingredients
                                </span>
                            </NavLink>
                            <NavLink
                                className={() =>
                                    queryString === "?reviews"
                                        ? "border-b-2 border-[#F40F6F] text-[#F40F6F] pb-2 px-1 text-sm font-semibold hover:cursor-pointer"
                                        : "border-b-2 border-white font-medium pb-2 px-1 text-sm hover:cursor-pointer"
                                }
                                to={`/product/${slug}?reviews`}
                            >
                                <span onClick={() => setActiveTab("reviews")} className=" whitespace-nowrap border-b-2 border-white font-medium px-1">
                                    Reviews
                                    {/* ({latest_reviews.length}) */}
                                </span>
                            </NavLink>
                            <NavLink
                                className={() =>
                                    queryString === "?return-policy"
                                        ? "border-b-2 border-[#F40F6F] text-[#F40F6F] pb-2 px-1 text-sm font-semibold hover:cursor-pointer"
                                        : "border-b-2 border-white font-medium pb-2 px-1 text-sm hover:cursor-pointer"
                                }
                                to={`/product/${slug}?return-policy`}
                            >
                                <span
                                    onClick={() => setActiveTab("return-policy")}
                                    className=" whitespace-nowrap border-b-2 border-white font-medium px-1"
                                >
                                    Return Policy
                                </span>
                            </NavLink>
                        </div>
                    </div>
                    <div className=" rounded-b-[8px] px-[3%] md:px-[5%] pt-1 pb-4 md:py-8 list-disc">
                        {/* {isHome ? <ProductDescription /> : <Outlet />} */}
                        {activeTab === "product_description" && <ProductDescription singleProduct={singleProduct} isLoading={isLoading} />}
                        {queryString === "?product_description" && <ProductDescription singleProduct={singleProduct} isLoading={isLoading} />}
                        {queryString === "?how-to-use" && <HowToUse singleProduct={singleProduct} isLoading={isLoading} />}
                        {queryString === "?ingredients" && <Ingredients singleProduct={singleProduct} isLoading={isLoading} />}
                        {queryString === "?reviews" && <Reviews singleProduct={singleProduct} isLoading={isLoading} refetch={refetch} />}
                        {queryString === "?return-policy" && <ReturnPolicy singleProduct={singleProduct} isLoading={isLoading} />}
                    </div>
                </div>
                <>
                    {isLoading === false && singleProduct?.data?.similar_products?.data && Array.isArray(singleProduct?.data?.similar_products?.data) && singleProduct?.data?.similar_products?.data?.length > 0 ? (
                        <>
                            <h4 className="text-lg font-medium mb-3 md:mb-6">Related Products</h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                                {singleProduct.data.similar_products.data.map((item, i) => (
                                    <Card key={i} item={item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </>
                <>
                    {isLoading === false && singleProduct?.data?.recently_views?.data && Array.isArray(singleProduct?.data?.recently_views?.data) && singleProduct?.data?.recently_views?.data?.length > 0  ? (
                        <>
                            <h4 className="text-lg font-medium mb-3 md:mb-6">Recently Viewed</h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                                {singleProduct?.data?.recently_views?.data.map((item, i) => (
                                    <Card key={i} item={item} />
                                ))}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </>
                
{/* 
                <>
                    <h4 className="text-lg font-medium mb-3 md:mb-6">Recently Viewed</h4>

                    {isLoading || (
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                            {recently_views.map((item, i) => (
                                <Card key={i} item={item} />
                            ))}
                        </div>
                    )}
                </> */}
            </div>
            <Footer />
            {/* <ScrollRestoration /> */}
            {queryString.includes("?") ? "" : <ScrollRestoration />}
        </div>
    );
};

export default SingleProduct;
