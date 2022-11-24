import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(express.json());
app.use(cors());

let commentsByPostId = {};
let commentId = 0;
app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  commentId++;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: req.params.id,
    content: req.body.content,
    status: "pending",
  });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: req.body.content,
      status: "pending",
      postId: req.params.id,
    },
  });
  res.json(comments);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);

  const { type, data } = req.body;

  try {
    if (type == "CommentModerated") {
      const { id, postId, status } = data;
      let comment = commentsByPostId[postId].find((c) => {
        return c.id == id;
      });
      comment.status = status;
      axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          status,
          content: data.content,
        },
      });
    }
    res.send({});
  } catch (err) {}
});

app.listen(4001, (req, res) => {
  console.log("server running on port 4001");
});
