const express = require("express");
const cors = require("cors");
const connectDb = require("./dbConnect");
const userRouter = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");
const morgan = require('morgan')

const http = require("http");
const { connectSocket } = require("./socketController");
const conversationRoute = require("./routes/conversationRoutes");
const { transporter } = require("./middlewares/nodemailer");

require("dotenv").config();
const app = express();
const server = http.createServer(app);

connectSocket(server);
// Configure Cloudinary

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));
app.use(morgan('dev'))

// Routes
app.use(userRouter);
app.use(conversationRoute);
app.use(messageRoute);

// Connect to database
connectDb();

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

app.get('/',(req,res)=>{
  return res.json({success:true,message:'chat-fussion backend was running'})
})

// Start server
server.listen(8000, () => {
  console.log("Server running on port 8000");
});

// Export upload if needed in other files
// module.exports = { upload };
