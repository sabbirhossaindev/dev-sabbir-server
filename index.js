const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

// middle ware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ok9cief.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectsCollection = client.db('sabBir').collection('projectsCollections');
        const skillsCollection = client.db('sabBir').collection('skills');
        const submitCollection = client.db('sabBir').collection('submit');

        // database insert to projects collections
        app.get('/projectsCollections', async (req, res) => {
            const query = {};
            const options = await projectsCollection.find(query).toArray();
            res.send(options);
        });
        
        // database insert to skills collections
        app.get('/skills', async (req, res) => {
            const filter = {};
            const result = await skillsCollection.find(filter).toArray();
            res.send(result);
        });

        // sab | Bir website all submit collection..
        app.post('/submit', async (req, res) => {
            const body = req.body;
            const doc = body;
            console.log(doc);
            const result = await submitCollection.insertOne(doc)
            console.log(result);
            res.send(result)
        });

    }
    finally {
        
    }
  }
  run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('mobile selling server is running');
});

app.listen(port, () => console.log(`sabBir server running on ${port}`));