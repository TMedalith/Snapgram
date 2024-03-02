const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./database");
const PORT = process.env.PORT;;


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(require("./Routes/authRoute"));
app.use(require("./Routes/userRoute"));
app.use(require("./Routes/postRoute"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});