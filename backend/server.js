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

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});
