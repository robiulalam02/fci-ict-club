import { Outlet } from "react-router"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"
import ScrollToTop from "./ScrollToTop"
import { AuthContext } from "./Providers/AuthProvider";
import { useContext } from "react";

function App() {

  const { loading, user } = useContext(AuthContext);
  // console.log(user);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-[#004274] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-[#004274] font-bold text-xl tracking-tighter">FCI ICT CLUB</h2>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
