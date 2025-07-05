const path = require("path")
const express = require("express");
const cors = require("cors");


require("dotenv").config();
const connectDB = require("./src/config/db");
const apiRoutes = require("./src/routes/index");
const globalErrorHandler = require("./src/controllers/errorController");


const app = express();
const port = process.env.PORT || 5001;


connectDB();

app.use("/public", express.static(path.join(__dirname, "/src/public")));
app.use('/public', express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api/v1", apiRoutes);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
