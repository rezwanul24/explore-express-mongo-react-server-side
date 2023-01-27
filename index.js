const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get('/users', async(req,res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/update/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const userData = await userCollection.findOne(query); 
            res.send(userData);
        })

        app.put('/update/:id', async(req,res)=>{
            const id = req.params.id;
            const updatedUsr = req.body;
            // console.log(updatedUsr);
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updateInfo = {
                $set:{
                    name: updatedUsr.name,
                    adress: updatedUsr.adress,
                    email: updatedUsr.email
                }
            }
            const result = await userCollection.updateOne(filter,updateInfo, options,); 
            res.send(result);
        })
        
        app.post('/users', async (req,res)=>{
            const data = req.body;
            console.log(data);
            const result = await userCollection.insertOne(data);
            res.send(result)
        })

        app.delete('/users/:id', async(req,res)=>{
            // console.log(id);
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query)
            res.send(result);
        })

        
        // console.log(result);
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