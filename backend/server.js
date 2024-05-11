const env = require("dotenv");
env.config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT;


app.use(express.json())
app.use("/", routes);

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected & App listning on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
