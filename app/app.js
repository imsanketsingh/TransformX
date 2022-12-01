// const express = require("express");
import express from "express";
// const targetRouter = require("./routes/target.js");
import sourceRouter from "./routes/source.js";
import bodyParser from "body-parser";

const app = express();

const port = "3000";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));



// app.use("/target", targetRouter);
app.use("/source", sourceRouter);
// app.use("/temp", tempRouter);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log("server working on 3000");
});
