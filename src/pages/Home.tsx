import { NavbarDemo } from "@/components/NavBar"
import bannerImage from "./../assets/bannerImage3.jpeg"


const Home = () => {
  return (
    <div className="bg-mutedBeige h-screen relative">
        <div className="absolute"><NavbarDemo/></div>
        <div className="pt-[4%]">
            <img src={bannerImage} alt="bannerImage" />
        </div>
    </div>
  )
}

export default Home
