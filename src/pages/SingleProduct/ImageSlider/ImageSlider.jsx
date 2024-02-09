import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/singleProduct/product (1).jpeg";
import image2 from "../../../assets/singleProduct/product (2).jpeg";
import image3 from "../../../assets/singleProduct/product (3).jpeg";
import image4 from "../../../assets/singleProduct/product (4).jpeg";
import image5 from "../../../assets/singleProduct/product (5).jpeg";
import {
  SlArrowDown,
  SlArrowLeft,
  SlArrowRight,
  SlArrowUp,
} from "react-icons/sl";
let images = [
  { src: image1 },
  { src: image2 },
  { src: image3 },
  { src: image4 },
  { src: image5 },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <>
      <div className="">
        <div className="flex flex-col-reverse md:flex-row md:gap-4 lg:gap-6">
          {/* slider for pc start */}
          <div className="md:w-4/12 lg:w-3/12 md:flex md:flex-col items-center hidden">
            <button onClick={() => slider1.slickPrev()}>
              <SlArrowUp
                className="mx-auto hidden md:block text-[#ffbfcd]"
                size={40}
              />
            </button>

            <div className="relative">
              <div
                onClick={() => slider1.slickPrev()}
                className="h-1/5 w-full absolute top-0 z-10 bg-gradient-to-b from-white hover:cursor-pointer"
              ></div>
              <Slider
                asNavFor={nav1}
                ref={(slider) => (slider2 = slider)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                arrows={false}
                vertical={true}
                centerMode={true}
                centerPadding="-80px"
                beforeChange={handleBeforeChange}
              >
                {images.map((image, index) => (
                  <div
                    className={` md:h-36 lg:h-48 w-full hover:cursor-pointer rounded-md ${
                      index === currentIndex ? "border border-[#F40F6F] " : ""
                    }`}
                    key={index}
                  >
                    <img
                      className="h-full w-full rounded-md"
                      src={image.src}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
              <div
                onClick={() => slider1.slickNext()}
                className=" h-1/5 w-full absolute bottom-0 z-10 bg-gradient-to-t from-white hover:cursor-pointer"
              ></div>
            </div>
            <button onClick={() => slider1.slickNext()}>
              <SlArrowDown
                className="mx-auto hidden md:block text-[#ffbfcd]"
                size={40}
              />
            </button>
          </div>
          {/* slider for pc end */}
          {/* big picture start */}
          <div className="md:w-8/12 lg:w-9/12 h-min relative">
            <Slider
              className="w-full"
              asNavFor={nav2}
              ref={(slider) => (slider1 = slider)}
              slidesToShow={1}
              arrows={false}
              vertical={true}
            >
              {images.map((image, index) => (
                <div className="w-full" key={index}>
                  <div
                    className=" w-full cursor-zoom-in relative overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={(e) =>
                      setPosition({
                        x: e.nativeEvent.offsetX,
                        y: e.nativeEvent.offsetY,
                      })
                    }
                  >
                    {isModalVisible && (
                      <div
                        className="hidden md:block absolute h-52 w-52 rounded-lg pointer-events-none"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          top: position.y - 100,
                          left: position.x - 100,
                        }}
                      />
                    )}
                    <img className="w-full rounded-lg" src={image.src} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
            {isModalVisible && (
              <div className="bg-white h-full w-full absolute top-0 left-[105%] overflow-hidden border z-20 rounded-lg ">
                <img
                  className=""
                  src={images[currentIndex].src}
                  alt="alt"
                  style={{
                    transform: `translate(50%, 50%) translate(-${position.x}px, -${position.y}px) scale(1.99)`,
                  }}
                />
              </div>
            )}
          </div>
          {/* big picture end */}
        </div>
      </div>

      {/* for mobile start */}
      <div className="flex items-center md:hidden m-4 justify-center mx-1">
        <button onClick={() => slider3.slickPrev()}>
          <SlArrowLeft className="mx-auto block md:hidden text-[#ffbfcd] w-7 h-7 sm:h-10 sm:w-10" />
        </button>
        <div className="w-10/12 brder">
          <div className="">
            <Slider
              asNavFor={nav1}
              ref={(slider) => (slider3 = slider)}
              slidesToShow={3}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
              centerMode={true}
              centerPadding="0px"
              beforeChange={handleBeforeChange}
            >
              {images.map((image, index) => (
                <div
                  className={` md:h-36 lg:h-48 w-full hover:cursor-pointer rounded-md px-1`}
                  key={index}
                >
                  <img
                    className={`h-full w-full rounded-md ${
                      index === currentIndex ? "border border-[#F40F6F] " : ""
                    }`}
                    src={image.src}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <button onClick={() => slider3.slickNext()}>
          <SlArrowRight className="mx-auto block md:hidden text-[#ffbfcd] w-7 h-7 sm:h-10 sm:w-10" />
        </button>
      </div>
      {/* for mobile end */}
    </>
  );
}

export default ImageSlider;
