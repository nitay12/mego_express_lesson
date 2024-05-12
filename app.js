const express = require("express");
const mysql = require("mysql2");

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root1234",
  database: "mego_users",
});

con.connect((err) => {
  if (err) {
    console.error(err);
  } else console.log("Connected to MySQL");
});

app.use(express.json());

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
  con.query(`SELECT * FROM users WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  const updatedUser = req.body;
  con.query(
    "UPDATE users SET ? WHERE id=?",
    [updatedUser, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        console.log(result);
        res.status(200).send({"id": id, ...updatedUser});
      }
    }
  );
});
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  con.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        console.log(result);
        res.status(200).send({"id": id});
      }
    }
  );
});

app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  con.query(
    "INSERT INTO users (username, email, password) VALUES (?, ? , ?)",
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        res
          .status(200)
          .send({ id: result.insertId, username, email, password });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
