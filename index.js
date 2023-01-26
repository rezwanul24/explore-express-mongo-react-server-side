const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// user: dbuser2
//  password: pcBtiVUXbLxEnUup



const uri = "mongodb+srv://dbuser2:pcBtiVUXbLxEnUup@cluster0.wm2o919.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        const userCollection = client.db('nodemongocurd').collection('users');
        const user = {name: 'testin', email: 'testing@gmail.com'};

        const result = await userCollection.insertOne(user);
        console.log(result);
    }
    finally{

    }
}

run().catch(error => console.log(error))


app.get('/', (req,res)=>{
    res.send('express server is running');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })