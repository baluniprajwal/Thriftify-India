"use client";
import { ImagesSlider } from "@/components/ui/images-slider";
import bannerImage4 from "./../assets/bannerimage4.jpg"
import bannerImage1 from "./../assets/milan-street-style-1920x1080.jpg"
import bannerImage2 from "./../assets/5305f1fbbcfb-nyfw-t.jpg.webp"
import bannerImage3 from "./../assets/1667308410549-full-bleed-crop-3-images.jpg"



import { motion } from "motion/react";

export function ImagesSliderDemo() {
  const images = [
    <img src={bannerImage1}/>,
    <img src={bannerImage3}/>,
    <img src={bannerImage4} className="h-auto w-full"/>,
    <img src={bannerImage2}/>,
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4 font-serif">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}
