import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const shoes = [
  {
    title: "Tree Dasher 2",
    color: "Rustic Orange",
    price: "$135",
    image: "https://i.pinimg.com/736x/3b/28/58/3b2858b71bfc24d6cedcb959e994d8f2.jpg",
  },
  {
    title: "Tree Runner Go",
    color: "Natural White/Rustic Orange",
    price: "$120",
    image: "https://i.pinimg.com/736x/a5/08/e5/a508e5c4a41edc69b0f00d30375287f0.jpg",
  },
  {
    title: "Tree Gliders",
    color: "Twilight White/Rustic Orange",
    price: "$135",
    image: "https://i.pinimg.com/736x/44/a2/ed/44a2ed6d7315776d41847698a504402a.jpg",
  },
  {
    title: "Tree Runners",
    color: "Rustic Orange",
    price: "$98",
    image: "https://i.pinimg.com/736x/11/52/94/11529416d5cf5c72d295f304768df3c0.jpg",
  },
];

const Grid3 = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
      <motion.div
        className="relative group overflow-hidden cursor-pointer rounded-md transition-shadow duration-500 hover:shadow-xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        >
        {/* Image zoom effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <img
            src="https://i.pinimg.com/736x/c1/57/bf/c157bf4ee2a9b05271b52c78c4a2990b.jpg"
            alt="Shoe Stack"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 space-y-4 bg-black/20 p-6 rounded-md h-full flex flex-col justify-end text-white">
            
        <h2 className="text-3xl md:text-4xl font-bold">Step Into Style with Thrifted Finds</h2>
        <p className="text-md">
        Discover unique, sustainable shoes that combine comfort, character, and craftsmanship from every walk of life.</p>


            {/* Hover Button */}
        <div className="pt-4">
            <button className="bg-gray-200 text-black px-6 py-2 font-medium  duration-500 hover:bg-black hover:text-white">
                SHOP MEN
            </button>
        </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shoes.map((category, index) => (
          <motion.div
          key={index}
          className="relative group overflow-hidden cursor-pointer rounded-md shadow-md"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-[21rem] object-cover transition-transform 
            duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
            <div className="flex justify-center items-center flex-1">
              <button className="px-6 py-2 bg-gray-200 text-black opacity-0 group-hover:opacity-100 hover:bg-black hover:text-white transition-all duration-500 pointer-events-auto">
                Shop Now
              </button>
            </div>
            <div className="text-white flex flex-col gap-1 pointer-events-auto">
              <h2 className="text-lg font-semibold">{category.title}</h2>
              <span className="text-sm font-medium">{category.price}</span>
            </div>
          </div>
        </motion.div>        
        ))}
      </div>
    </div>
  );
}

export default Grid3;
