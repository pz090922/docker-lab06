import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
const Test = mongoose.model("Test", new mongoose.Schema({ name: String }));

app.post("/test", async (req, res) => {
  const { name } = req.body;
  try {
    const test = new Test({ name });
    await test.save();
    res.status(201).send(test);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/test", async (req, res) => {
  try {
    const data = await Test.find();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/", (req, res) => {
  res.send("OK");
});

const connect = async () => {
  try {
    await mongoose.connect(`mongodb://database:27017/`);
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

connect();
