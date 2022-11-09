const express = require("express")
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config();
const Port = process.env.Port || 5000;

//middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("quick eat  server is running");
});



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k39mtry.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.listen(Port, () => {
    console.log("quick eat server is running", Port);
})