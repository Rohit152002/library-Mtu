import mongoose from "mongoose";

const mongodb = () => {
  mongoose.connect(process.env.DATABASE_URL);

  mongoose.connection.on("open", () => {
    console.log("Database is connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

export default mongodb;
