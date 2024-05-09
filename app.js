const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.send("Return users list");
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Return user id ${id} details`);
});
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Update user id ${id} details`);
});
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Delete user id ${id}`);
});
app.post("/users", (req, res) => {
  res.send("Add a user to the DB");
});

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
