import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContextProvider";
import apiRequest from "@/lib/apiService";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { UserMessageSchema, UserMessageTypeSchema } from "@/schema/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { format } from "timeago.js";
import { SocketContext } from "@/context/SocketContext";

interface ChatProps {
  trigger: React.ReactNode;
  chat: {
    id: string;
    receiver: {
      id: string;
      username: string;
      avatar: string | null;
    };
  };
}

const ChatOwner = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useContext(AuthContext);
  const [chatData, setChatData] = useState<any>({ messages: [] });
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const formMethods = useForm<UserMessageTypeSchema>({
    resolver: zodResolver(UserMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data, error, isLoading } = useQuery<ChatProps>({
    queryKey: ["chatMessages", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8800/api/chats/${id}`, {
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

  useEffect(() => {
    if (data) {
      setChatData(data);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (data: any) => {
        setChatData((prev: any) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
      };

      socket.on("getMessage", handleNewMessage);

      return () => {
        socket.off("getMessage", handleNewMessage);
      };
    }
  }, [socket]);

  const onSubmit = async (values: UserMessageTypeSchema) => {
    setIsFormLoading(true);
    try {
      const response = await apiRequest.post(`/messages/${id}`, {
        text: values.message,
      });

      formMethods.reset();
      socket?.emit("sendMessage", {
        receiverId: chatData?.chat?.participant?.id,
        data: response.data,
      });

      setChatData((prev: any) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setIsFormLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading chat</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="border p-4 rounded-md mb-4">
        {chatData && chatData.chat && (
          <div className="flex items-center mb-4">
            <Avatar className="w-12 h-12 border">
              <AvatarImage
                src={chatData?.chat.participant?.avatar || "/placeholder.svg"}
              />
              <AvatarFallback>
                {chatData?.chat.participant?.username}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div className="font-semibold capitalize">
                Agent: {chatData?.chat.participant?.username}
              </div>
            </div>
          </div>
        )}
        <div className="border p-4 rounded-md h-96 flex flex-col w-full gap-2 overflow-y-scroll mb-4">
          {chatData?.messages.map((item: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col rounded-md px-3 py-2 max-w-[30rem] w-auto ${
                currentUser?.id === item.userId
                  ? "bg-blue-200 ml-auto text-right "
                  : "bg-neutral-100 mr-auto text-left"
              }`}
            >
              <p className="font-semibold capitalize">
                {currentUser?.id === item.userId ? "You" : chatData.chat.participant.username}
                :
              </p>
              <div>{item.text}</div>
              <div className="text-xs text-gray-500">
                {format(new Date(item.createdAt), "p")}
              </div>
              <div ref={messageEndRef}></div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col pt-3 w-full border-t">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="flex w-full items-center gap-3"
            >
              <FormField
                control={formMethods.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="p-3"
                        placeholder="Send a message..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Button
                  className="hover:bg-blue-600/80 bg-blue-600 py-2"
                  type="submit"
                  disabled={isFormLoading}
                >
                  {isFormLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ChatOwner;
