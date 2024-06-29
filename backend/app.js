import express from "express"
import cors from "cors";
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"
import restrictRoute from "./routes/restrict.route.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials:true}));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/restrict", restrictRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);



app.listen(8800, () => {
    console.log("Server is running on port 8800!")
})