import Hero from "/assets/Hero.png";
import Phone1 from "/assets/Phone1.jpg";
import Phone2 from "/assets/Phone2.jpg";
import Phone3 from "/assets/Phone3.jpg";
import Phone4 from "/assets/Phone4.jpg";
import Phone5 from "/assets/Phone5.jpg";
import Phone6 from "/assets/Phone6.jpg";
import Phone7 from "/assets/Phone7.jpg";
import Phone8 from "/assets/Phone8.jpg";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  const picture = [
    {
      img: Hero,
    },
    {
      img: Phone1,
    },
    {
      img: Phone2,
    },
    {
      img: Phone3,
    },
    {
      img: Phone4,
    },
    {
      img: Phone5,
    },
    {
      img: Phone6,
    },
    {
      img: Phone7,
    },
    {
      img: Phone8,
    },
  ];
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop ={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {picture.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item.img}
            alt=""
            style={{ width: "400px" }}
            className="rounded-xl pt-3 max-sm:p-0"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
