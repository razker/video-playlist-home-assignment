require("dotenv").config();
import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  if (database) {
    return;
  }

  console.log(
    `DB connection string: ${process.env.MONGO_CONNECTION_STRING} | DB name: ${process.env.MONGO_DB_NAME}`
  );

  const uri = process.env.MONGO_CONNECTION_STRING;
  const dbName = process.env.MONGO_DB_NAME;

  Mongoose.connect(uri, {
    dbName: dbName,
    serverSelectionTimeoutMS: 5000,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();

  database.once("close", async () => {
    console.log("Diconnected  to database");
  });
};
