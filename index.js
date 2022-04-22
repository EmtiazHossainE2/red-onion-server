//1
const express = require('express');
const app = express()
const port = process.env.PORT || 5000
//5^1
const { MongoClient, ServerApiVersion } = require('mongodb');


//3 
const cors = require('cors');
require('dotenv').config() 

//4 
app.use(cors())
// app.use(express.json()) 

//5 

const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntqc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});






//2 
app.get('/' , (req,res) => {
    res.send('Red onion Server Running')
})

app.listen(port , () => {
    console.log('Red onion Running' , port);
})
