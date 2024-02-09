import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import mobile from "../../../assets/BrowseByCategory/mobile.png";
import computers from "../../../assets/BrowseByCategory/Computer.png";
import makeup from "../../../assets/BrowseByCategory/makeup.png";
import laptops from "../../../assets/BrowseByCategory/laptop.png";
import lipstick from "../../../assets/BrowseByCategory/lipstick.png";
import monitors from "../../../assets/BrowseByCategory/monitor.png";

import Swiper from "react-id-swiper";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ImageURL from "../../../components/ImageURL/ImageURL";
import { ProviderContext } from "../../../provider/Provider";

const BrowseByCategory = () => {
  const location = useLocation();
  const isCampaign = location.pathname.includes("campaign");
  const { setCondition } = useContext(ProviderContext);
  const params = {
    slidesPerView: 6,
    spaceBetween: 25,
    slidesPerGroup: 3,
    loop: false,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      1536: {
        slidesPerView: 8,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      460: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      300: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  };

  const swiperRef = useRef(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const [categories, setCategories] = useState([]);
  //
  useEffect(() => {
    axios
      .get("category")
      .then((res) => {
        if (res.data.success === true) {
          setCategories(res.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px- overflow-x-hidden">
      <div
        className={`mb-3 md:mb-[38px] flex ${
          isCampaign ? "justify-end" : "justify-between"
        }`}
      >
        {isCampaign || (
          <h3 className="  text-xl md:text-2xl font-semibold text-black">
            Browse by Category
          </h3>
        )}
        <div className="flex items-center gap-3">
          <button>
            <HiOutlineChevronLeft
              onClick={goPrev}
              className="text-3xl bg-[#FFF1F4] text-[#F40F6F] rounded-sm p-[5.5px] hover:cursor-pointer"
              // size={32}
            />
          </button>
          <button>
            <HiOutlineChevronRight
              onClick={goNext}
              className="text-3xl bg-[#FFF1F4] text-[#F40F6F] rounded-sm p-[5.5px] hover:cursor-pointer"
            />
          </button>
        </div>
      </div>

      <div className="mb-6 md:mb-16">
        <Swiper ref={swiperRef} {...params}>
          {categories &&
            categories?.map((item, i) => (
              <div key={i}>
                <Link to={`/category/${item?.slug}`}>
                  <div onClick={()=> setCondition("category")} className="w-full rounded-lg hover:shadow-lg hover:shadow-[#FFBFCD66] border-[0.5px] border-[#FFF1F4] hover:border-[#FFBFCD] hover:cursor-pointer">
                    <div className="flex flex-col items-center mt-8">
                      {/* <img
                                            className="w-[70px] h-[70px] mb-5"
                                            src={`http://192.168.1.61/${item.image}`}
                                            alt=""
                                        /> */}
                      <ImageURL
                        className={"mb-5 h-[70px] w-[70px] rounded"}
                        image={item?.image}
                      />
                      <p className="text-sm font-semibold mb-[25px] text-[#000000CC]">
                        {item?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrowseByCategory;
