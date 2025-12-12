// require("dotenv").config();
// const cors = require('cors');
// const mongoose = require("mongoose");
// const express = require("express");
// const path = require("path");
// const app = new express();
// app.use(cors());
// const ConnectDb = require("./utilities/db.util");
// const roleRouter = require("./routes/role.route");
// const statusRouter = require("./routes/status.route");
// const priorityRouter = require("./routes/priority.route");
// const userRouter = require("./routes/user.route");
// const taskRouter = require("./routes/task.route");
// const otpRouter = require("./routes/otp.route");
// app.use(express.static(path.join(__dirname, "../dist")));
// const port = process.env.PORT;
// const host = process.env.HOST;

// app.use(express.json({limit: '10mb'}));
// app.use(express.urlencoded({extended:true, limit : '10mb'}));
// app.use("/api/v1/roles", roleRouter);
// app.use("/api/v1/status", statusRouter);
// app.use("/api/v1/priority", priorityRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/task", taskRouter);
// app.use("/api/v1/otp", otpRouter);

// ConnectDb().then(() => {
//     app.listen(port, () => {
//         console.log(`server is ready on http://${host}:${port}`);
//     });
// }).catch(err => console.log(err));



require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();

// 1️⃣ CORS ALWAYS FIRST
app.use(cors({
  origin: "https://car-advertisement-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 2️⃣ JSON Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 3️⃣ Static Files (optional)
app.use(express.static(path.join(__dirname, "../dist")));

// 4️⃣ Routes (AFTER CORS + PARSERS)
const roleRouter = require("./routes/role.route");
const statusRouter = require("./routes/status.route");
const priorityRouter = require("./routes/priority.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const otpRouter = require("./routes/otp.route");

app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/priority", priorityRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/otp", otpRouter);

// 5️⃣ DB + SERVER
const ConnectDb = require("./utilities/db.util");
ConnectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server ready on port ${process.env.PORT}`);
  });
}).catch(err => console.log(err));
