import mongoose from "mongoose";

import { app } from "./app";

//http://www.sheshbabu.com/posts/running-express-over-https-in-localhost/
const fs = require("fs");
const https = require("https");

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

var os = require("os");
var hostname = os.hostname();

const start = async () => {
  console.log("hostname",hostname)
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  // https.createServer({ key, cert }, app).listen(3000, () => {
  //   console.log("running on port 3000");
  // });

  app.listen(3000, () => {
    console.log("running on port 3000");
  });
};

start();
