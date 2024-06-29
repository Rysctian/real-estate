import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Chat from "@/components/chat/Chat";
import apiRequest from "@/lib/apiService";
import PropertyListCard, { PropertyProps } from "../properties/PropertyListCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);

  const fetchUserPosts = async () => {
    const response = await apiRequest.get(`/users/profilePosts/${currentUser?.id}`);
    return response.data;
  };

  const fetchNotifications = async () => {
    const response = await apiRequest.get("/users/notifications");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userPosts", currentUser?.id],
    queryFn: fetchUserPosts,
    enabled: !!currentUser?.id,
  });

  const { data: notifications, isLoading: notificationsLoading, error: notificationsError } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userPosts = data?.userPosts || [];
  const savedPosts = data?.savedPosts || [];

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800 dark:text-gray-200 overflow-hidden">
      <header className="bg-gray-300 p-6 flex items-center gap-4 md:px-36">
        <img src={currentUser?.avatar || "noavatar.jpg"} className="h-20 w-20 rounded-full " />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{currentUser?.username}</h1>
          <p className="text-gray-500 dark:text-gray-400">{currentUser?.username}</p>
          <Link to={"/update-profile"}>Update profile</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Joined</p>
            <p>June 2021</p>
          </div>
          <div>
            <p className="font-medium">Properties</p>
            <p>{userPosts?.length || 0}</p>
          </div>
          <div>
            <p className="font-medium">Messages</p>
            <p>12</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:px-36">
        <div className="col-span-1 md:col-span-2">
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Email</p>
                <p>{currentUser.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p>+1 (555) 555-5555</p>
              </div>
            </div>
          </section>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-4">My Properties</h2>
                {isLoading ? (
                  <p>Loading properties...</p>
                ) : error ? (
                  <p>Error loading properties</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userPosts.map((property: PropertyProps) => (
                      <PropertyListCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
            <TabsContent value="saved">
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-4">Saved Posts</h2>
                {isLoading ? (
                  <p>Loading properties...</p>
                ) : error ? (
                  <p>Error loading properties</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedPosts?.map((property: PropertyProps) => (
                      <PropertyListCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </section>
            </TabsContent>
          </Tabs>
        </div>
        <div className="col-span-1">
          <section>
            <h2 className="text-xl font-bold mb-4 border-b-[1px] pb-3">Bookings Notification</h2>
            <div className="space-y-4">
              {notificationsLoading ? (
                <p>Loading notifications...</p>
              ) : notificationsError ? (
                <p>Error loading notifications</p>
              ) : (
                notifications?.map((notification) => (
                  <div key={notification.id} className="border p-4 rounded">
                    <p className="text-sm">{notification.message}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 border-b-[1px] pb-3">Messages</h2>
            <div className="space-y-4">
              <Chat />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
