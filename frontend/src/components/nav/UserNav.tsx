"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "@/lib/apiService";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { AvatarImage } from "@radix-ui/react-avatar";
import LoginModal from "../forms/login-modal";
import { Button } from "../ui/button";

interface Props {
   userId?: string | null;
}

export function UserNav({ userId }: Props) {
   const authContext = useContext(AuthContext);
   const { currentUser } = authContext;
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         await apiRequest.post("/auth/logout");
         localStorage.removeItem("user");
         navigate("/login");
      } catch (err) {
         console.log(err);
      }
   };

   const isLoggedIn = !!userId || !!currentUser;

   return (
      <div className="flex gap-4 h-full items-center">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <div className="hidden md:flex gap-2 items-center rounded-full border-[1px] px-4 py-1 hover:shadow-md cursor-pointer">
                  <GiHamburgerMenu />
                  <Avatar>
                     <AvatarImage src={currentUser?.avatar || "noavatar.jpg"} />
                     <AvatarFallback>
                        {currentUser?.username?.[0] || "?"}
                     </AvatarFallback>
                  </Avatar>
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
               <DropdownMenuGroup>
                  {isLoggedIn ? (
                     <>
                        <DropdownMenuLabel className="font-normal">
                           <div className="flex flex-col space-y-1">
                              <Link
                                 to={"/user-profile"}
                                 className="flex w-full items-start flex-col justify-start"
                              >
                                 <p className="text-sm font-medium leading-none">
                                    {currentUser?.username}
                                 </p>
                                 <p className="text-xs leading-none text-muted-foreground font-medium text-[.960rem] pt-3 hover:underline">
                                    {currentUser?.email}
                                 </p>
                              </Link>
                           </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                           <Link to={"/user-profile"}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Link to={"/add-property"}>Add Property</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="cursor-pointer"
                           onClick={handleLogout}
                        >
                           Log out
                        </DropdownMenuItem>
                     </>
                  ) : (
                     <>
                        <DropdownMenuItem asChild>
                           <LoginModal
                              trigger={
                                 <Button
                                    variant={"ghost"}
                                    className="w-full flex justify-start"
                                 >
                                    Login
                                 </Button>
                              }
                           />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full justify-start">
                           <Link to={"/register"}>Sign Up</Link>
                        </DropdownMenuItem>
                     </>
                  )}
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
