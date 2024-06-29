import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContextProvider";
import { UserMessageSchema, UserMessageTypeSchema } from "@/schema/message";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiRequest from "@/lib/apiService";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "timeago.js";
import { SocketContext } from "@/context/SocketContext";


interface ChatDialogProps {
  trigger: React.ReactNode;
  chat: {
    id: string;
    receiver: {
      id: string;
      username: string;
      avatar: string;
    };
  };
}

function ChatDialog({ trigger, chat }: ChatDialogProps) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [chatData, setChatData] = useState<any>(null); 
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  
  const messageEndRef = useRef();



  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const {
    data,
    isLoading: isChatLoading,
    error: chatError,
  } = useQuery({
    queryKey: ["chatMessages", chat.id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8800/api/chats/${chat.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser?.id}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
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

  const formMethods = useForm<UserMessageTypeSchema>({
    resolver: zodResolver(UserMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: UserMessageTypeSchema) => {
    setIsFormLoading(true);
    try {
      const response = await apiRequest.post(`/messages/${chat.id}`, {
        text: values.message,
      });

      formMethods.reset();
      socket?.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: response.data,
      });


      setChatData((prev) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));



    } catch (err: any) {
      setFormError(err.response?.data?.message || "Failed to send message");
    } finally {
      setIsFormLoading(false);
    }
  };



  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChatData((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chatData]);



  if (!currentUser) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="px-4 pb-4">
        <DialogHeader className="w-full items-center justify-center py-2 mb-3 border-b-[1px]">
          <DialogTitle className="text-2xl font-bold flex flex-col items-center">
            Message
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={chat.receiver.avatar || "/placeholder.svg"}
              alt="Receiver Avatar"
            />
            <AvatarFallback>{chat.receiver.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-3xl font-bold flex flex-col mb-4 ">
            {chat.receiver.username}
          </div>
        </div>

        <div className="flex flex-col gap-2 h-[18rem] overflow-auto">
          {isChatLoading && <div>Loading...</div>}
          {chatError && <div>Error loading chat messages</div>}
          {chatData?.messages.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-md px-3 py-2 max-w-[25rem] w-auto ${
                currentUser?.id === item.userId
                  ? "bg-blue-200 ml-auto"
                  : "bg-neutral-100 mr-auto"
              }`}
            >
              <p className="font-semibold">
                {currentUser?.id === item.userId ? "You" : chat.receiver.username}
                :
              </p>
              <p className="text-sm">{item.text}</p>
              <span className="text-[.750rem] text-neutral-700">
                {format(item.createdAt)}
              </span>
              <div ref={messageEndRef}></div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-5 flex flex-col pt-3 w-full border-t">
          {formError && <div className="text-red-500">{formError}</div>}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatDialog;
