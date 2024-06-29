import { useState, useContext } from "react";
import DOMPurify from "dompurify";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { GoBookmark } from "react-icons/go";
import { MdBookmarkAdded, MdPets } from "react-icons/md";
import { GiElectric } from "react-icons/gi";
import { IoWaterSharp } from "react-icons/io5";
import { MdPropaneTank } from "react-icons/md";
import { FaCar, FaSwimmingPool, FaWifi } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import {
  AwardIcon,
  CalendarIcon,
  CheckIcon,
  Club,
  MoreHorizontal,
  StarIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Map from "../Map";
import apiRequest from "@/lib/apiService";
import { AuthContext } from "@/context/AuthContextProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { IoBarbell, IoWarning } from "react-icons/io5";
import { BsChatFill } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Separator } from "../ui/separator";

const amenitiesList = [
  {
    key: "swimmingPool",
    icon: <FaSwimmingPool size={27} />,
    label: "Swimming Pool",
  },
  {
    key: "fitnessCenter",
    icon: <IoBarbell size={27} />,
    label: "Fitness Center",
  },
  { key: "clubhouse", icon: <Club size={27} />, label: "Clubhouse" },
  {
    key: "playground",
    icon: <FaChildren size={27} />,
    label: "Playground",
  },
  {
    key: "parking",
    icon: <FaCar size={27} />,
    label: "Parking",
  },
  {
    key: "petFriendly",
    icon: <MdPets size={27} />,
    label: "Pet friendly",
  },
];

const utilitiesList = [
  {
    key: "wifi",
    icon: <FaWifi size={27} />,
    label: "Wifi",
  },
  {
    key: "water",
    icon: <IoWaterSharp size={27} />,
    label: "Water",
  },
  {
    key: "gas",
    icon: <MdPropaneTank size={27} />,
    label: "Gas",
  },
  {
    key: "electricity",
    icon: <GiElectric size={27} />,
    label: "Electricity",
  },
];

const PropertyItem = () => {
  const post = useLoaderData() as any;
  const [saved, setSaved] = useState<boolean>(post.isSaved);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!post) {
    return <div>Loading...</div>;
  }
  const handleSavePost = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      const response = await apiRequest.post("users/save", { postId: post.id });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error saving post:", error);
      setSaved((prev) => !prev);
    }
  };

  const { mutate: deletePost } = useMutation({
    mutationFn: () => apiRequest.delete(`posts/${post.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast({
        action: (
          <div className="w-full flex items-center">
            <CheckIcon className="mr-2" color="green" />
            <span className="first-letter:capitalize text-sm">
              {post.title} successfully deleted
            </span>
          </div>
        ),
      });
      navigate("/");
    },
    onError: () => {
      toast({
        action: (
          <div className="w-full flex items-center">
            <IoWarning className="mr-2" color="red" />
            <span className="first-letter:capitalize text-sm">
              An error occurred while deleting
            </span>
          </div>
        ),
      });
    },
  });

  const handleMessageOwner = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const response = await apiRequest.post("/chats/", {
        receiverId: post.user.id,
      });
      navigate(`/chats/${response.data.id}`);
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  const handleBookingSubmit = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const response = await apiRequest.post("/users/booking", {
        bookingDate,
        postId: post.id,
      });
      console.log(response.data.message);

      toast({
        action: (
          <div className="w-full flex items-center">
            <CheckIcon className="mr-2" color="green" />
            <span className="first-letter:capitalize text-sm">
              Booking created successfully
            </span>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        action: (
          <div className="w-full flex items-center">
            <IoWarning className="mr-2" color="red" />
            <span className="first-letter:capitalize text-sm">
              Failed to create booking
            </span>
          </div>
        ),
      });
    }
  };

  const formattedDate = post.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.createdAt))
    : "";

  return (
    <div className="max-w-[70%] w-full mx-auto md:px-6 py-8 md:py-12 h-[90rem] mb-[20rem]">
      <div className="grid md:grid-cols-1 gap-20 md:gap-12">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 max-h-[700px]  gap-2">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg transition-all">
              {post.images && post.images[0] && (
                <img
                  src={post.images[0]}
                  alt="Main Image"
                  className="object-cover h-full w-full"
                />
              )}
            </div>
            {post.images &&
              [1, 2].map(
                (index) =>
                  post.images[index] && (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg transition-all"
                    >
                      <img
                        src={post.images[index]}
                        alt={`Image ${index}`}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  )
              )}
          </div>

          <div className="grid gap-6">
            <div className="w-full flex justify-between">
              <div>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className=" ">
                  <p className="text-lg font-semibold">
                    ₱{post.price.toLocaleString()}{" "}
                    {post.postDetail.type === "rent" ? "/ month" : ""}
                  </p>
                </p>
                <p className="text-gray-500 text-base">{post.address}</p>
              </div>

              <div className="flex gap-3 items-center">
                {currentUser?.id !== post.user.id && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Book a schedule for viewing or negotiations
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <div>
                        <Calendar
                          mode="single"
                          selected={bookingDate}
                          onSelect={(date) => {
                            setBookingDate(date);
                          }}
                          initialFocus
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <PopoverClose>
                            <Button variant="outline">Cancel</Button>
                          </PopoverClose>
                          <Button onClick={handleBookingSubmit}>Submit</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {currentUser?.id === post.user.id ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to={`/update-property/${post.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deletePost()}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button onClick={handleSavePost}>
                    {saved ? (
                      <MdBookmarkAdded size={25} color="blue" />
                    ) : (
                      <GoBookmark size={25} color="blue" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center gap-4 border-y-[1px] py-3">
              <div className="flex gap-2 items-center">
                <Avatar className="w-12 h-12 border">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col ">
                  <div className="flex items-center">
                    <div className="font-semibold capitalize">
                      Agent: {post.user.username}
                    </div>
                    <Separator orientation="vertical" />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-[.800rem] hover:bg-blue-500 transition delay-100 text-black hover:text-white rounded-md px-2 flex items-center gap-1 py-1">
                          {" "}
                          <IoCall /> Contact now!
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-lg">
                            Agent Contacts
                          </AlertDialogTitle>
                          <Separator />
                          <AlertDialogDescription className="flex flex-col gap-3 text-base text-black">
                            <p>Email: {post.user.email}</p>
                            <p>Contact: {post.user.contactNumber}</p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                          <Button
                            variant={"default"}
                            onClick={handleMessageOwner}
                            className="flex gap-3"
                          >
                            Message Agent <BsChatFill />
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Listed on: {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-16">
                <div className="flex items-center gap-4">
                  <AwardIcon className="w-8 h-8 fill-amber-500" />
                  <div>
                    <div className="font-semibold">Superhost</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Experienced, highly rated host
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StarIcon className="w-8 h-8 fill-yellow-400" />
                  <div>
                    <div className="font-semibold">4.93</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      745 reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5">
          <div className="grid gap-10 md:col-span-3">
            {post?.postDetail && (
              <div>
                <h3 className="text-2xl font-bold">What this place offers</h3>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  {amenitiesList.map(
                    (amenity) =>
                      post?.postDetail[amenity.key] && (
                        <div
                          key={amenity.key}
                          className="flex items-center gap-4"
                        >
                          {amenity.icon}
                          <div>{amenity.label}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {post?.postDetail && (
              <div>
                <h3 className="text-2xl font-bold mt-8">Utilities</h3>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  {utilitiesList.map(
                    (utility) =>
                      post?.postDetail[utility.key] && (
                        <div
                          key={utility.key}
                          className="flex items-center gap-4"
                        >
                          {utility.icon}
                          <div>{utility.label}</div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            <div className="py-4">
              <h2 className="font-bold text-2xl mb-3  mt-6">
                About this Property
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  {" "}
                  {post.bathroom} bathroom · {post.bedroom} bedroom ·{" "}
                  {post.postDetail.size} sqft
                </div>

                <div
                  className="bottom"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.postDetail?.desc),
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="border h-[30rem] md:col-span-2 mb-10">
            <Map properties={[post]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
