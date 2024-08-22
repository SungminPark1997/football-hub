const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.post("/api/post", (req, res) => {
  const { title, content } = req.body;
  console.log("Received data:", { title, content });

  // 데이터 처리 후 응답
  res.status(200).json({ message: "Post received successfully!" });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
