import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { PORT, mongoDBUrl } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";

require("dotenv").config();

const app = express();

//middleware needed to allow express to use json - parsing request body
app.use(express.json());

//Middleware to handle CORS POLICY - Cross Origin Resource Sharing
app.use(cors())

//we need a route to use GET for server
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Bookstore!");
});

app.use('/books', bookRoutes)

//use mongoose to connect to DB
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to database");
    //listen on static port
    app.listen(process.env.PORT || 5555, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//mongoose is an object data library model for mongoDB
