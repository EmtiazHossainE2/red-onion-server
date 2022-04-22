//1
const express = require('express');
const app = express()
const port = process.env.PORT || 5000
//5^1
const { MongoClient, ServerApiVersion } = require('mongodb');


//3 
const cors = require('cors');
require('dotenv').config() // npm dotenv 

//4 
app.use(cors())
app.use(express.json()) 

//5 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ntqc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//6
async function run() {
    try {
        //7
        await client.connect();
        const serviceCollection = client.db("redOnion").collection("service");

        // 8 find multiple [get means load data ]
        app.get('/service' , async(req,res) => {
            const query = {} ; 
            const cursor = serviceCollection.find(query) 
            const services = await cursor.toArray()
            res.send(services)
        })

        //9 find one 

        //10 add item (insert one item) [post means add data ]
        app.post('/service' , async(req,res) => {
            const service = req.body 
            const result = await serviceCollection.insertOne(service)
            res.send(result)
        })

        //11 delete 

        //12 update 

        
    } finally {
        //await client.close();
    }
}
run().catch(console.dir);

//2 
app.get('/', (req, res) => {
    res.send('Red onion Server Running')
})

app.listen(port, () => {
    console.log('Red onion Running', port);
})
