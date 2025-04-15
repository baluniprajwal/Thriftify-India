import { motion } from "framer-motion";
import image from "../assets/bannerimage4.jpg";

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function OurStorySection() {
  return (
    <section className="bg-[#faf6ee] py-14 px-6">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Image with animation */}
        <motion.div
          className="md:w-1/2"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={image}
            alt="Modern chair representing sustainability"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* Text Content with animation */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-rose-600 mb-4">Our Story</h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            We believe in giving beautiful clothes a second chance at life. Each piece in our
            collection is carefully curated, bringing together style, sustainability, and stories.
            <br /><br />
            By choosing pre-loved fashion, you're not just updating your wardrobe – you're joining
            a movement toward more conscious, sustainable style choices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

  