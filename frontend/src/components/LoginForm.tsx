import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation, useLazyGetMeQuery } from "@/redux/apis/userApi";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/authReducer";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast"; // Import toast

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [getMe] = useLazyGetMeQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ email, password }).unwrap();
      const user = await getMe().unwrap();
      dispatch(setUser(user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err:any) {
      console.error("Login failed:", err);
      if (err.data && err.data.message) {
        toast.error(err.data.message);
      } 
       else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    toast.success("Google login functionality coming soon!"); // Example toast
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full bg-creamyWhite dark:bg-black rounded-lg px-4 py-12">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
          Log In
        </h2>

        <form className="flex flex-1 flex-col justify-between" onSubmit={handleSubmit}>
          <div className="flex-grow pb-5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow mb-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In →"}
          </button>

          <p className="text-sm text-center text-neutral-700 dark:text-neutral-400 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black dark:text-white hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

