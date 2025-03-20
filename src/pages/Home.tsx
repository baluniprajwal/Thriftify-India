import { ImagesSliderDemo } from "@/components/hero"
import { NavbarDemo } from "@/components/NavBar"
import { WobbleCardDemo } from "@/components/wobbleCard"


const Home = () => {
  return (
    <div className="bg-mutedBeige min-h-screen relative">
        <div className="absolute"><NavbarDemo/></div>
        <div className="pt-[4%]">
            <ImagesSliderDemo/>
        </div>
        <div className="w-full pt-[2%]">
          <WobbleCardDemo/>
        </div>
    </div>
  )
}

export default Home
