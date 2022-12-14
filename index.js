const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qtkkwyv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const courses = client.db("courses").collection("course");

async function run() {
  try {
    await client.connect();

    app.get("/course", async (req, res) => {
      const result = await courses.find({}).toArray();
      res.send(result);
    });

    app.get("/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await courses.findOne(query);
      res.send(result);
    });
  } finally {
    //
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("herocourse connect db");
});

app.listen(port, () => {
  console.log("listen db to", port);
});
