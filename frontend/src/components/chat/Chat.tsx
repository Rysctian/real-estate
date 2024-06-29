import { useQuery } from "@tanstack/react-query";
import  { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthContext } from "@/context/AuthContextProvider";
import ChatDialog from "./ChatDialog";
import { Button } from "../ui/button";
import { format } from "timeago.js";


interface ChatProps {
  id: string;
  userIDs: string[];
  createdAt: string;
  seenBy: string[];
  lastMessage: string;
  receiver: {
    id: string;
    username: string;
    avatar: string;
  };
}

function Chat() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();



  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const {
    data: chatMessages,
    isLoading,
    error,
  } = useQuery<ChatProps[]>({
    queryKey: ["chat"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8800/api/chats/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser?.id}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!currentUser,
  });

  if (!currentUser) {
    return null;
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading chat messages</div>;

  const messages = Array.isArray(chatMessages) ? chatMessages : [];

  return (
    <div className="flex flex-col gap-3">
      {messages.map((chat) => (
        <div key={chat.id} className="border-b-[1px] py-4  bg-neutral-100 px-4 shadow-sm  border-neutral-200">
          <div>
            <div className="flex gap-1 items-center">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={chat.receiver.avatar || "/placeholder.svg"}
                  alt="Receiver Avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="w-full flex justify-between">
                <p className="font-medium text-base">{chat.receiver.username}</p>
                <div className="text-gray-500  w-fit dark:text-gray-400 text-sm">
              {format(chat.createdAt)}
              </div>
              </div>
            </div>
            
          </div>
          <div className="w-full flex items-center flex-wrap justify-between">
            <p>{chat.lastMessage}</p>
            <ChatDialog
              chat={chat}
              trigger={<Button variant={"link"}>Go to Conversation</Button>}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
