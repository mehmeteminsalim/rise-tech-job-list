const express = require("express");

const app = express();

let priorities = [
  {
    name: "Urgent",
    value: 0,
  },
  {
    name: "Regular",
    value: 1,
  },
  {
    name: "Trivial",
    value: 2,
  },
];

app.get("/priorities", (req, res) => {
  res.send(priorities);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server listening");
});
