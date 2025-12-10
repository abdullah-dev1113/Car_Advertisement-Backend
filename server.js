require("dotenv").config();
const cors = require('cors');
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = new express();
app.use(cors());
const ConnectDb = require("./utilities/db.util");
const roleRouter = require("./routes/role.route");
const statusRouter = require("./routes/status.route");
const priorityRouter = require("./routes/priority.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const otpRouter = require("./routes/otp.route");
app.use(express.static(path.join(__dirname, "../dist")));
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended:true, limit : '10mb'}));
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/priority", priorityRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/otp", otpRouter);

ConnectDb().then(() => {
    app.listen(port, () => {
        console.log(`server is ready on http://${host}:${port}`);
    });
}).catch(err => console.log(err));

// app.listen(port, "0.0.0.0", () => {
//     console.log(`server is running on port ${port}`);
// });
