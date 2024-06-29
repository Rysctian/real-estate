// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import React, { ReactNode, useContext, useState } from "react";
// import CloudinaryUploadWidget from "../../components/upload-files/CloudinaryUploadWidget.jsx";
// import { AuthContext, User } from "@/context/AuthContextProvider.js";
// import apiRequest from "@/lib/apiService.js";
// import { Loader2 } from "lucide-react";

// function AvatarUpdate() {
//   const [open, setOpen] = useState(false);

//   const authContext = useContext(AuthContext);
//   const { currentUser, updateUser } = authContext;

//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [avatar, setAvatar] = useState<string[]>([]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

   

//     try {
//       const res = await apiRequest.put(`/users/${currentUser?.id}`, {
//         avatar: avatar[0], 
//       });
//       updateUser(res.data);
//       setAvatar([])
//     } catch (err: any) {
//       console.log(err);
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
 


//     </form>
//   );
// }

// export default AvatarUpdate;
