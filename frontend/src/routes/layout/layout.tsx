import { Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/nav/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { Toaster } from "@/components/ui/toaster";

function Layout() {
   return (
      <div>
         <div className="top-0 sticky border-b-[1px] shadow-sm z-30">
            <Navbar />
         </div>
         <Outlet />
         <Toaster />
      </div>
   );
}

function RequireAuth() {
   const { currentUser } = useContext(AuthContext);

   if (!currentUser) return <Navigate to={"/login"} />;

   return (
      <div>
         <Navbar />
         <Outlet />
         <Toaster />
      </div>
   );
}

export { Layout, RequireAuth };
