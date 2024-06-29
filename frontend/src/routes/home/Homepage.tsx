import PropertyList from "@/components/PropertyList";

function Homepage() {
   return (
      <div className="w-full  mx-auto bg-[#EFEEEF]">
         <header className="bg-slate-600 max-h-[40rem] lg:h-[35rem]  text-white py-8">
            <div className="container mx-auto px-4 md:px-20">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                     <h1 className="text-5xl font-bold mb-4">
                        Find Your Dream Home
                     </h1>

                     <p className="text-gray-300 text-sm mb-6 mt-1">
                        Explore a curated selection of stylish condos and
                        apartments in prime locations. Find your perfect space
                        today!
                     </p>
                  </div>
                  <div className=" items-center justify-center hidden md:block">
                     <img
                        src="/images/featured_image.png"
                        alt="Hero Image"
                        width={1000}
                        height={1000}
                     />
                  </div>
               </div>
            </div>
         </header>
         <div className=" w-full mx-auto">
            <PropertyList />
         </div>
      </div>
   );
}

export default Homepage;
