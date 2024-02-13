const express = require("express");
const dotenv = require ("dotenv")
const chats = require("./data/data");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { log, error } = require("console");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
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
app.use(notFound);
app.use(errorHandler);


const PORT =5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
