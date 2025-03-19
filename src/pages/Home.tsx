import { NavbarDemo } from "@/components/NavBar"
import bannerImage from "./../assets/bannerImage3.jpeg"


const Home = () => {
  return (
    <div className="bg-mutedBeige h-screen">
        <div className="w-full"><NavbarDemo/></div>
        <div className="">
            <img src={bannerImage} alt="bannerImage" />
        </div>
    </div>
  )
}

export default Home
