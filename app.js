require("dotenv").config();
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const conenctDB = require("./db/connect");
const storeRoutes = require("./routes/store");
const app = express();
const port = 3000;

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Apo</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", storeRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await conenctDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("RUnning");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
