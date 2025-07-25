const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const candidateRoute = require("./routes/candidateRoutes");
const voterRoute = require("./routes/voterRoutes");
const voteRoute = require("./routes/voteRoutes");
const pendingVoteRoute = require("./routes/pendingVoteRoutes");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create raw HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", //"http://localhost:3000", // Frontend URL   
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

/*
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
*/

app.use(cors());

app.use(express.json());

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoute);
app.use("/api/voter", voterRoute);
app.use("/api/vote", voteRoute);
app.use("/api/pending-vote", pendingVoteRoute);

// ------------------------
// 🔌 WebSocket logic
let currentVoter = null;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("grant-vote", (voter) => {
    currentVoter = voter;
    io.emit("voter-granted", voter);
  });

  socket.on("cancel-vote", () => {
    currentVoter = null;
    io.emit("voter-cancelled");
  });

  socket.on("vote-cast", ({ voter_id }) => {
  currentVoter = null;
  io.emit("vote-cast", { voter_id });
});

socket.on("votes-cleared", () => {
  currentVoter = null;
  io.emit("votes-cleared");
});

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
// ------------------------

// Connect to DB and Start Server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at port ${PORT} with MongoDB connected`);
  });
}).catch(err => {
  console.error("Error connecting MongoDB. ", err);
});
