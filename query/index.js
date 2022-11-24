import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

const posts = {};

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status,
    });
  }

  if (type == "CommentUpdated") {
    const { id, content, postId, status } = data;
    console.log(posts[postId]);
    const comment = posts[postId].comments.find((c) => {
      return c.id == id;
    });
    comment = data;
  }
}

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const { data } = await axios.get("http://localhost:4005/events");

  for (let event of data) {
    console.log("processing event: ", event.type);
    handleEvent(event.type, event, data);
  }
});
