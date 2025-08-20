const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user-routes");
const taskRouter = require("./routes/task-route");

//everytime while connecting with server we need to import the database connection
require("./database");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    headers: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.use("/api", (req, res) => {
  res.status(200).json({ message: "hello  express" });
});

//to run it in local host use the following command
// node server/index.js
app.listen(5000, () => console.log(`App is now running on port 5000`));
