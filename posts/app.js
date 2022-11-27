import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(cors());
app.use(express.json());

let posts = {};
let id = 0;
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  id++;
  posts[id] = {
    id,
    title: req.body.title,
  };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title: req.body.title,
    },
  });
  res.json(id);
});
app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});
app.listen(4000, () => {
  console.log("v20");
  console.log("server started on port 4000");
});
