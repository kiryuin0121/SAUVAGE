import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "../../../types/product";
import { motion } from "motion/react";
type Props = {
  images: Image[];
};

const Slider = ({ images }: Props) => {
  // console.log(images)ok;
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
      spaceBetween={0}
      slidesPerView={1}
      className=" w-full aspect-square rounded-xl bg-neutral-100 overflow-hidden"
      centeredSlides={true}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id} className="overflow-hidden">
          <motion.img
            src={image.imageUrl}
            alt={image.imageUrl}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* <div className="w-full h-full rounded-xl bg-neutral-300" /> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
