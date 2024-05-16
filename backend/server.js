const env = require("dotenv");
env.config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers","*");
  next()
})
 




app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/", routes);

app.use(errorHandler);




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
