import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "@/components/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf6ee] text-neutral-800">
      <Navbar />
      <main className="flex-grow pt-[63px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
