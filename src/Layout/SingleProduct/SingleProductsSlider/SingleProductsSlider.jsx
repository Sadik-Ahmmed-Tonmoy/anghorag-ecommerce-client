/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowRight, SlArrowUp } from "react-icons/sl";
import image1 from "../../../assets/singleProduct/product (1).jpeg";
import image2 from "../../../assets/singleProduct/product (2).jpeg";
import image3 from "../../../assets/singleProduct/product (3).jpeg";
import image4 from "../../../assets/singleProduct/product (4).jpeg";
import image5 from "../../../assets/singleProduct/product (5).jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageURL from "../../../components/ImageURL/ImageURL";
import SingleProductTitle from "../../../pages/SingleProduct/SingleProductTitle/SingleProductTitle";
import './SingleProductsSlider.css'

// let sliderImages = [
//   { src: image1 },
//   { src: image2 },
//   { src: image3 },
//   { src: image4 },
//   { src: image5 },
// ];

const SingleProductsSlider = ({ singleProduct, isLoading }) => {
    
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

    const singleProductData = isLoading || singleProduct?.data;
    const productImages = isLoading || singleProduct?.data?.products?.images;
    const sliderImages = productImages?.filter((image) => image !== null);

    

    return (
        <div className="md:flex justify-between gap-8 my-3">
            <div className=" w-full md:w-6/12">
                {/* product image start */}
                <>
                    <div className="">
                        <div className="relative flex flex-col-reverse md:flex-row md:gap-4 lg:gap-6">
                            {/* slider for pc start */}
                            <div className="lg:w-3/12 lg:flex lg:flex-col items-center hidden">
                                <button onClick={() => slider1.slickPrev()}>
                                    <SlArrowUp className="mx-auto hidden md:block text-[#ffbfcd]" size={40} />
                                </button>

                                <div className="relative">
                                    <div
                                        onClick={() => slider1.slickPrev()}
                                        className="h-1/5 w-full absolute top-0 z-10 bg-gradient-to-b from-white hover:cursor-pointer"
                                    ></div>
                                    <Slider
                                        asNavFor={nav1}
                                        ref={(slider) => (slider2 = slider)}
                                        slidesToShow={sliderImages.length > 3 ? 3 : sliderImages.length}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        arrows={false}
                                        vertical={true}
                                        centerMode={true}
                                        centerPadding="-80px"
                                        beforeChange={handleBeforeChange}
                                    >
                                        {sliderImages &&
                                            sliderImages.map((item, index) => (
                                                <div
                                                    className={` md:h-36 lg:h-28 xl:h-40 2xl:h-48 w-full hover:cursor-pointer rounded-md ${
                                                        index === currentIndex ? "border border-[#F40F6F] " : ""
                                                    }`}
                                                    key={index}
                                                >
                                                    {/* <img
                            className="h-full w-full rounded-md"
                            src={item.src}
                            alt=""
                          /> */}
                                                    <ImageURL image={item} className="h-full w-full rounded-md" />
                                                </div>
                                            ))}
                                    </Slider>
                                    <div
                                        onClick={() => slider1.slickNext()}
                                        className=" h-1/5 w-full absolute bottom-0 z-10 bg-gradient-to-t from-white hover:cursor-pointer"
                                    ></div>
                                </div>
                                <button onClick={() => slider1.slickNext()}>
                                    <SlArrowDown className="mx-auto hidden md:block text-[#ffbfcd]" size={40} />
                                </button>
                            </div>
                            {/* slider for pc end */}
                            {/* big picture start */}
                            <div className=" lg:w-9/12 h-min ">
                                <Slider
                                    className="w-full"
                                    asNavFor={nav2}
                                    ref={(slider) => (slider1 = slider)}
                                    slidesToShow={1}
                                    arrows={false}
                                    vertical={true}
                                >
                                    {sliderImages.map((item, index) => (
                                        <div className="w-full" key={index}>
                                            <div
                                                className={` w-full h-[305px] ${windowWidth > 430 && "h-[330px]"} ${windowWidth > 450 && "h-[350px]"} xs:h-[362px] sm:h-[370px] md:h-[380px] lg:h-[370px] xl:h-[370px] 2xl:h-[372px] cursor-zoom-in relative overflow-hidden`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                onMouseMove={(e) => handleMouseMove(e)}
                                            >
                                                {isModalVisible && (
                                                    <div
                                                        className="hidden lg:block absolute h-52 w-52 rounded-lg pointer-events-none"
                                                        style={{
                                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                            top: position.y - 100,
                                                            left: position.x - 100,
                                                        }}
                                                    />
                                                )}
                                                {/* <img
                          className="w-full rounded-lg"
                          src={item.src}
                          alt=""
                        /> */}
                                                <ImageURL image={item} className="w-full h-full rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            {/* big picture end */}
                        </div>
                    </div>

                    {/* for mobile start */}
                    <div className="flex items-center lg:hidden m-4 justify-center mx-1">
                        <button onClick={() => slider3.slickPrev()}>
                            <SlArrowLeft className="mx-auto block text-[#ffbfcd] w-7 h-7 sm:h-10 sm:w-10" />
                        </button>
                        <div className="w-10/12">
                            <div className="">
                                <Slider
                                    asNavFor={nav1}
                                    ref={(slider) => (slider3 = slider)}
                                    slidesToShow={sliderImages?.length > 3 ? 3 : sliderImages?.length}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    arrows={false}
                                    centerMode={true}
                                    centerPadding="0px"
                                    beforeChange={handleBeforeChange}
                                >
                                    {sliderImages.map((item, index) => (
                                        <div className={`h-[75px] w-5 ${windowWidth > 450 && "h-[100px]"} ${windowWidth > 380 && "h-[70px]"} xs:h-[120px] sm:h-[150px] md:h-24 lg:h-48  hover:cursor-pointer rounded-md px-1`} key={index}>
                                            {/* <img
                          className={`h-full w-full rounded-md ${
                            index === currentIndex
                              ? "border border-[#F40F6F] "
                              : ""
                          }`}
                          src={item.src}
                          alt=""
                        /> */}
                                            <ImageURL
                                                image={item}
                                                className={`h-full w-full rounded-md ${index === currentIndex ? "border border-[#F40F6F] " : ""}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <button onClick={() => slider3.slickNext()}>
                            <SlArrowRight className="mx-auto block text-[#ffbfcd] w-7 h-7 sm:h-10 sm:w-10" />
                        </button>
                    </div>
                    {/* for mobile end */}
                </>
                {/* product image end */}
                {/* <ImageSlider /> */}
            </div>
            <div className=" w-full md:w-6/12 relative">
                {/* hover image start */}
                {isModalVisible && (
                    <div className="hidden md:h-[490px] lg:h-full md:block bg-white h-full w-full absolute top-0 left-[0%] overflow-hidden border z-20 rounded-lg ">
                        {/* <img
                className=""
                src={sliderImages[currentIndex].src}
                alt="alt"
                style={customStyle}
              /> */}
                        <ImageURL style={customStyle} image={sliderImages[currentIndex]} className="h-full w-full rounded-md" />
                    </div>
                )}
                {/* hover image end */}
                <SingleProductTitle singleProductData={singleProductData} />
            </div>
        </div>
    );
};

export default SingleProductsSlider;
