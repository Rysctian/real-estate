import { Link } from "react-router-dom";
import Logo from "../logo";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { UserNav } from "./UserNav";
import { PropertyNav } from "../PropertyNav";

function Navbar() {
  return (
    <header className="flex items-center justify-between py-10 h-20 px-4 bg-white shadow-sm md:px-6 w-full ">
      <div className="flex gap-8">
        <Link to="/" className=" items-center gap-2  md:block">
          <Logo />
        </Link>
        
      </div>
      <div className="flex items-center gap-4">
        <PropertyNav/>
        <Button variant={"ghost"} className="rounded-md">
          <Link to={"/add-property"} className="flex">
          <PlusIcon className="w-4 h-4 mr-2" />
            List Property
          </Link>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}

export default Navbar;
