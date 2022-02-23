import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";


import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js'
import messageRoute from './routes/messageRoutes.js'

//.env file initialize
dotenv.config();

//mongoDB connection established
connectDB()

const app = express();

app.use(express.json())
//app.use(cors())

//Configure api endpoints with routers

app.use('/api/users', userRoute)
app.use('/api/messages', messageRoute)

const __dirname = path.resolve()

//This is checking if the app is in production mode or development mode and serving the static HTML file if any endpoint other than the ones mentioned above is hit
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const PORT = process.env.PORT || 5000

const httpServer = createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 60000,
    pingInterval: 25000,
    cors: {
        origin: "http://localhost:3000"
    }
})


//server listening on idle port
httpServer.listen(
    PORT, console.log(`Server running in ${ process.env.NODE_ENV } at port ${ PORT }`)
)
//users array to store the current users in chat
let users = [];

//when a user logs in add the user with their id to the array
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

//when a user logs out remove the user from the array
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

//get the user from the array based on the user id
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //on connection 
    console.log("a user connected.");

    //taking userId and socketId from client
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ from, to, text, createdAt }) => {
        console.log(users)
        const u = users.filter((user) => user.userId === from);
        console.log(u);
        io.to(u[0].socketId).emit("getMessage", {
            from,
            to,
            text
        });
        const v = users.filter((user) => user.userId === to);
        io.to(v[0].socketId).emit("getMessage", {
            from,
            to,
            text
        });
    });

    //send a broadcast message
    socket.on("sendBroadcast", ({ from, text }) => {
        io.emit("getBroadcast", { from, text })
    });

    //on disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});