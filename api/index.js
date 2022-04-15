// import express from "express";
// import sanityClient from "./client.js";
const bodyParser = require("body-parser");
const functions = require("./apicall");
const app = require("express")();

app.use(bodyParser.json());
const sanityClient = require("./client");
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
// const { default: functions } = require("./apicall");
app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

app.get("/getallposts", (req, res) => {
  sanityClient.sanityClient
    .fetch(
      `    *[_type == "post"]{
      title,_id,mainImage{asset->{url}},categories,body
      }
        `
    )
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/createPost", upload.single("file"), (req, res) => {
  const body = req.body;
  functions
    .setMyVar(body.user, body.caption, body.desc, req.file)
    .then((data) => res.json(data));
});

app.get("/getuser/:user", (req, res) => {
  const useremail = req.params.user;
  sanityClient.sanityClient
    .fetch(
      `*[_type == "author" && email=="${useremail}"]{
  _id,
name, 
"post": *[_type == "post" && references(^._id)]{
      title,_id,mainImage{asset->{url}},categories
      }
    }`
    )
    .then((data) => {
      if (data[0] === undefined) {
        res.sendStatus(404, "usernotfound");
      } else {
        // console.log(data);
        res.send(data);
      }
    });
});

app.post("/createuser", (req, result) => {
  const body = req.body;
  console.log(body.name);

  sanityClient.sanityClient
    .create({
      _type: "author",
      name: body.name,
      email: body.email,
    })
    .then((turtle) => {
      result.json(turtle);

      console.log(turtle);
    })
    .catch((err) => console.log(err));
  //   console.log(body);
});

app.listen(8000, () => {
  console.log("listening on" + 8000);
});
