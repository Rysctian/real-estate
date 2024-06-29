import { Home } from "lucide-react";


function Logo() {
  return (
    <a href="/" className=" flex items-center justify-center gap-2">
      <div className=" text-2xl md:text-2xl font-extrabold tracking-tighter xl:text-3xl/none bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        InstaStay
      </div>
      <Home color="purple" height={30} width={30} />
    </a>
  );
}

export default Logo;
