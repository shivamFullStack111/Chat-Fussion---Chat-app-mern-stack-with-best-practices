const { Server } = require("socket.io");

const emailToSocketid = new Map();
const socketidToEmail = new Map();
let activeUsers = [];

let io;

const addUserTo_activeUsers = (userEmail, socket) => {
  if (
    !emailToSocketid.has(userEmail) &&
    !socketidToEmail.has(socket.id) &&
    !activeUsers.includes(userEmail)
  ) {
    emailToSocketid.set(userEmail, socket.id);
    socketidToEmail.set(socket.id, userEmail);
    activeUsers.push(userEmail);
  }

  io.emit("activeUsers", activeUsers);
};

const connectSocket = async (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    socket.on("me", (userEmail) => {
      addUserTo_activeUsers(userEmail, socket);
    });

    socket.on("disconnect", () => {
      const email = socketidToEmail.get(socket.id);
      socketidToEmail.delete(socket.id);
      emailToSocketid.delete(email);
      activeUsers = activeUsers.filter((user) => user !== email);
      io.emit("activeUsers", activeUsers);
    });
  });

  console.log("Socket connection established");
};

module.exports = {
  connectSocket,
};
