import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  try {
    const event = req.body;

    events.push(event);

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    res.json({
      status: "OK",
    });
  } catch (error) {
    res.json({});
  }
});

app.get("/events", async (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
