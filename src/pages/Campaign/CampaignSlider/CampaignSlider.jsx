import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import mobile from "../../../assets/BrowseByCategory/mobile.png";
import computers from "../../../assets/BrowseByCategory/Computer.png";
import makeup from "../../../assets/BrowseByCategory/makeup.png";
import laptops from "../../../assets/BrowseByCategory/laptop.png";
import lipstick from "../../../assets/BrowseByCategory/lipstick.png";
import monitors from "../../../assets/BrowseByCategory/monitor.png";

import Swiper from "react-id-swiper";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Card from "../../../components/Card/Card";

const CampaignSlider = () => {
    const location = useLocation();
    const isCampaign = location.pathname.includes("campaign");
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
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            460: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            300: {
                slidesPerView: 1,
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

    return (
        <div className="container mx-auto px-2 overflow-x-hidden mt-8 md:mt-20">
            <div
                className={`mb-3 md:mb-6 flex ${
                    isCampaign ? "justify-end" : "justify-between"
                }`}
            >
                <div className="flex items-center gap-3 w-20">
                    <SlArrowLeft
                        onClick={goPrev}
                        className="bg-[#FFF1F4] text-[#F40F6F] rounded-sm p-2 hover:cursor-pointer"
                        size={34}
                    />
                    <SlArrowRight
                        onClick={goNext}
                        className="bg-[#FFF1F4] text-[#F40F6F] rounded-sm p-2 hover:cursor-pointer"
                        size={34}
                    />
                </div>
            </div>
            <div className="">
                <Swiper ref={swiperRef} {...params}>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                    <div>
                        <Card />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default CampaignSlider;
