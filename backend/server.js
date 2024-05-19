const express = require("express");
const dotenv = require ("dotenv")
const chats = require("./data/data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { log, error } = require("console");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const ConnectDB = require("./config/db")
const cors=require("cors");
dotenv.config();
ConnectDB();

const app = express();
app.use ( express.json());

app.use(cors());      


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.get('/', (req, res) => {
  res.send("API is running");
});

app.use("/api/user" , userRoutes)  // (app, {});
app.use("/api/chat" , chatRoutes)
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);


const PORT =5000;
 const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
 const io = require("socket.io")(server, {
  pingTimeout: 120000,
  cors: {
    origin: "http://localhost:3000", //development
    // origin: "https://textalot.herokuapp.com", //deployment
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`Logged in user ${userData.name} joined the created room`);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined the selectedChat Room: " + room);//room-selectedChatId
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
      //.in-- inside user._id exclusive socket room joined-- emit this "message recieved" event ////mern-docs

    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

});  

////////////////////////////////////////////////////////////////
////////////////////////////////
//call join to subscribe the socket to a given channel/room

/* io.on("connection", (socket) => {
  socket.join("some room");
}); */

//broadcast to a room from a given socket --  every socket in the room excluding the sender will get the event.

/* io.on("connection", (socket) => {
  socket.to("some room").emit("some event");
}); */