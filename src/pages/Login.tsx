import LoginForm from "@/components/LoginForm"
import loginLogo from "./../assets/thriftlogin.jpg"

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-thrift-gradient">
        <div className="flex justify-center bg-creamyWhite h-[80%] w-[62%] rounded-2xl shadow-lg">
            {/* Left Section (Image with Text) */}
            <div className="w-1/2 relative flex items-center justify-center">
            {/* Image */}
            <img
                src={loginLogo}
                alt="loginLogo"
                className="h-full w-full rounded-2xl object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-2xl">
                <div className="text-white text-center px-4">
                <h2 className="text-3xl font-bold font-serif">Welcome to Thriftify India</h2>
                <p className="text-lg mt-2 font-sans">Find the best deals on second-hand fashion</p>
                </div>
            </div>
            </div>
            
            {/* Right Section */}
            <div className="w-1/2 flex flex-col p-6">
            <div className="flex h-full w-full">
                <LoginForm />
            </div>
            </div>
        </div>
        </div>
  )
}

export default Login
