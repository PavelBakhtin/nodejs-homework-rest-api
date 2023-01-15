const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);
const { HOST_URI } = process.env;
(async () => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });

  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error while connecting to database", error.massage);
    process.exit(1);
  }
})();
