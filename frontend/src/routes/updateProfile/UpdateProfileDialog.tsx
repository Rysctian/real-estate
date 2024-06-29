import { Button } from "@/components/ui/button";

import { AuthContext } from "@/context/AuthContextProvider";
import apiRequest from "@/lib/apiService";

import { Separator } from "@radix-ui/react-select";
import { CheckIcon, Loader2 } from "lucide-react";
import { useContext, useState } from "react";

// @ts-ignore
import CloudinaryUploadWidget from "../../components/upload-files/CloudinaryUploadWidget.jsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
import { toast } from "@/components/ui/use-toast.js";

function UpdateProfile() {
  const authContext = useContext(AuthContext);
  const { currentUser, updateUser } = authContext;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const { username, email, password, contactNumber } = Object.fromEntries(formData);
  
    setIsLoading(true);
  
    try {
      const res = await apiRequest.put(`/users/${currentUser?.id}`, {
        username,
        email,
        contactNumber,
        password,
        avatar: avatar[0], 
      });
      updateUser(res.data);
      toast({
        action: (
          <div className="w-full flex items-center">
            <CheckIcon className="mr-2" color="green" />
            <span className="first-letter:capitalize text-sm">
              Profile successfully updated
            </span>
          </div>
        ),
      });
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
      toast({
        variant: "destructive",
        title: "Error! 🎉",
        description: "An error occurred, please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  console.log(avatar);

  
  return (
    <Card className="overflow-hidden h-screen">
      <CardHeader className="w-full h-[120px] flex flex-col justify-center pl-24 bg-blue-500 text-white">
        <CardTitle>Edit your Profile</CardTitle>
        <CardDescription className="text-white">
          Choose details to edit your profile
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 max-w-[90rem]  h-screen mx-auto">
        <div className="flex">
          Avatar:
          <img src={avatar[0]} alt="" className="avatar" />
          <CloudinaryUploadWidget
            uwConfig={{
              cloudName: "christian30",
              uploadPreset: "InstaStay",
              multiple: false,
              folder: "avatars",
            }}
            setState={setAvatar}
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser?.username}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser?.email}
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              

              id="contactNumber"
              name="contactNumber"
              type="number"
              defaultValue={currentUser?.contactNumber}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          {error && <span>error</span>}

          <div className="self-end flex gap-3 mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Updating" : "Update"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default UpdateProfile;
