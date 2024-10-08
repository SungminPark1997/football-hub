import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
db.on("error", (error) => console.log("DB error", error));
db.once("open", handleOpen);
// useNewUrlParser:true, useUnifiedTopology:true;
