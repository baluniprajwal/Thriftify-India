import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "./redux/apis/userApi";
import { useEffect } from "react";
import { setUser, clearUser } from "./redux/reducers/authReducer";
import ProductSearch from "./pages/ProductSearch";
import Dashboard from "./pages/admin/Dashboard";
import CancelRedirect from "./components/CancelRedirect";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useGetMeQuery(undefined, {
    skip: !user,
  });

  useEffect(() => {
    if (userProfile) {
      dispatch(setUser(userProfile)); 
    } else if (!isLoading && isError) {
      const status = (error as any)?.status;
      if (status !== 401) {
        console.error("Unexpected error while fetching user:", error);
        toast.error("Something went wrong while fetching user data.");
      }
      dispatch(clearUser());
    }
  }, [userProfile, isLoading, isError, error, dispatch]);

  if (isLoading) {
   
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<ProductSearch />} />
        </Route>
        <Route path="/cancel" element={<CancelRedirect />} />
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;

