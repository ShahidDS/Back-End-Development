import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to my new server");
});

app.listen(PORT, () => {
  console.log(`My server is runing on localhost:${PORT}`);
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Shahid" },
    { id: 2, name: "Khan" },
    { id: 3, name: "akbar" },
  ];
  return res.json(users);
});

app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  res.json({ message: "New user added successfully", user: newUser });
});
