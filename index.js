const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

// Create Socket.io Server
const io = new Server(server);

// Handle Socket.io Connections
io.on("connection", (socket) => {
    console.log("A new user connected");

    // Listen for Chat Messages
    socket.on("chatMessage", (message) => {
        console.log("📩 Received message:", message);
        io.emit("message", message); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

 
// Define the greeting API endpoint
app.get('/API/greet/:name', (req, res) => {
   const name = req.params.name;
   users.push(name); 
 
   // Write updated user data to JSON file
   fs.writeFileSync('users.json', JSON.stringify(users), 'utf8'); 
 
   res.send(`Hello ${name}, welcome to the Full Stack App!`);
 });



// Serve Static Files
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Start the Server
server.listen(3000, () => console.log("🚀 Server started at PORT: 3000"));
