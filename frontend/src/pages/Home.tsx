import CategoryGrid from "@/components/CategoryGrid"
import CategoryGrid2 from "@/components/CategoryGrid2"
import Divider from "@/components/Divider"
import Grid3 from "@/components/Grid3"
import { ImagesSliderDemo } from "@/components/hero"
import OurStorySection from "@/components/OurStorySection"


const Home = () => {
  return (
    <div className="bg-mutedBeige min-h-screen relative overflow-hidden">
        <div id="hero-section">
            <ImagesSliderDemo/>
        </div>
        <div className="p-[15px]">
          <CategoryGrid/>
        </div>
        <div className="h-[22rem] bg-warmBrown">
          <Divider/>
        </div>
        <div className="py-[15px]">
          <CategoryGrid2/>
        </div>
        <div>
          <OurStorySection/>
        </div>
        <div>
          <Grid3/>
        </div>
    </div>
  )
}

export default Home
