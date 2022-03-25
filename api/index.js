// import express from "express";
// import sanityClient from "./client.js";
const bodyParser = require("body-parser");
const app = require("express")();
app.use(bodyParser.json());
// const sanityClient = require("./client");

// const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on("connection", (socket) => {
//   // console.log("what is socket:", socket);
//   console.log("SOCKET IS ACTIVE");
//   socket.on("chat", (payload) => {
//     // console.log("WHAT IS PAYLOAD", payload);
//     io.emit("chat", payload);
//   });
// });
// server.listen(5000, () => {
//   console.log("SERVER IS LISTENING...");
// });

const io = require("socket.io")(app, {
  path: "/socket.io",
});

io.attach(app, {
  // includes local domain to avoid CORS error locally
  // configure it accordingly for production
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("👾 New socket connected! >>", socket.id);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/useme", (req, res) => {
  const body = req.body;

  sanityClient.sanityClient
    .create({ _type: "author", name: body.name })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  //   console.log(body);
});

app.listen(8000, () => {
  console.log("listening on" + 8000);
});
