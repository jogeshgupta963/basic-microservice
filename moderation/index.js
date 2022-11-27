import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  try {
    const { type, data } = req.body;
    if (type == "CommentCreated") {
      const status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }
    res.send({});
  } catch (error) {
    res.json(error);
  }
});

app.listen(4003, () => {
  console.log("listening on 4003");
});
