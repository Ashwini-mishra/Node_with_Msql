const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("./createDb");
require("./config/db");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const uploadPostRouter = require("./src/routes/postRoutes");
const commentsRouter = require("./src/routes/commentsRoutes");

global.__basedir = __dirname;
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT || 8000;

/***************** routes *********************/
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", uploadPostRouter);
app.use("/api", commentsRouter);
app.get("/", (req, res)=> {
    res.send("Working");
});

app.listen(port,()=> { console.log(`server running on port ${port} ....` );});
