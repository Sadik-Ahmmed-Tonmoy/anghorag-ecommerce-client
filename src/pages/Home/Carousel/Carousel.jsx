import { useEffect, useState } from "react";
import useHomeBanner from "../../../hooks/useHomeBanner.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Skeleton } from "antd";
import ImageURL from "../../../components/ImageURL/ImageURL.jsx";
const Carousel = () => {
  const { bannerData, isLoading } = useHomeBanner();

  //

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
  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {windowWidth <= 640 && bannerData?.success === true && (
            <span>
              {bannerData?.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    {/* <img
                      className="h-full"
                      src={item.small_image && item.small_image}
                      alt={`Banner ${index}`}
                    /> */}
                    <ImageURL
                      className="h-full"
                      image={item?.small_image && item?.small_image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </span>
          )}
          {windowWidth >= 641 && bannerData?.success === true && (
            <>
              {bannerData?.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    {/* <img
                      className="h-full"
                      src={item.big_image && item.big_image}
                      alt={`Banner ${index}`}
                    /> */}
                    <ImageURL
                      className="h-full"
                      image={item?.big_image && item?.big_image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      )}
    </>
  );
};

export default Carousel;
