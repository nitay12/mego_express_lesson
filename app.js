const express = require("express");
const mysql = require("mysql2");
const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mego_users",
});

con.connect((err) => {
  if (err) {
    console.error(err);
  } else console.log("Connected to MySQL");
});
app.get("/users", (req, res) => {
  con.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
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
