import { motion } from "framer-motion";
import bgImage from "../assets/bgImage.jpg";

export default function Divider() {
  return (
    <div
      className="relative w-full h-full md:h-full flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.2 }} // Ensures animation starts when 20% of the section is visible
      >
        <h1 className="text-3xl md:text-5xl font-bold">
          Sustainable Style, Timeless Finds
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Curated thrifted fashion for a better planet. Find unique, pre-loved
          pieces and shop consciously.
        </p>
      </motion.div>
    </div>
  );
}
