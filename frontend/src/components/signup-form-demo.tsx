import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/apis/userApi";
import { useLazyGetMeQuery } from "@/redux/apis/userApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/authReducer";
import { IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast"; 

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [getMe] = useLazyGetMeQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const userData = { firstName, lastName, email, password };
  
      const result = await registerUser(userData).unwrap();
      
      if (result.message === "User registered successfully") {
        const user = await getMe().unwrap();
        dispatch(setUser(user));
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
  
      if (err.data && err.data.message) {
        toast.error(err.data.message);
      } 
       else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    toast.success("Google signup functionality coming soon!");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-full bg-creamyWhite dark:bg-black rounded-lg px-4 py-2">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
          Sign Up
        </h2>

        <form className="flex flex-1 flex-col justify-between" onSubmit={handleSubmit}>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer className="w-full">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </LabelInputContainer>

              <LabelInputContainer className="w-full">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="example@domain.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </LabelInputContainer>
          </div>

          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow mb-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up →"}
          </button>
          <p className="text-sm text-center text-neutral-700 dark:text-neutral-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black dark:text-white hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Log in
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


