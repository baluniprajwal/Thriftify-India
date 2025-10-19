import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from "./../assets/menCategory.jpg";
import img2 from "./../assets/shoeCategoryGrid.jpg";
import img3 from "./../assets/accessoriesCategoryGrid.jpg";

const categories = [
  {
    title: "Clothing",
    subtitle: "Pre-Loved & Vintage Styles for Every Occasion",
    image: img1,
    route: "search/",
  },
  {
    title: "Shoes",
    subtitle: "Gently Worn Sneakers, Boots & More",
    image: img2,
    route: "search?name=shoes",
  },
  {
    title: "Accessories",
    subtitle: "Bags, Jewelry & Unique Finds",
    image: img3,
    route: "search?name=watch",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="relative group overflow-hidden cursor-pointer"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-[600px] object-cover transition-transform 
            duration-500 ease-in-out will-change-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-around text-white p-4">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="text-md">{category.subtitle}</p>
            </div>
            <button
              onClick={() => navigate(category.route)}
              className="mt-20 px-7 py-2 bg-gray-200 text-black opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-black hover:text-white ease-in-out"
            >
              Shop Now
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;

