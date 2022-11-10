const express = require("express")
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require ('dotenv').config();
const Port = process.env.Port || 5000;

//middleware
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    res.send("quick eat  server is running");
});



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k39mtry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('quickEat').collection('services');
        const reviewCollection = client.db('quickEat').collection('reviews');
        
        app.get('/services', async (req, res) => {
            const count=parseInt(req.query.count);
            const cursor = serviceCollection.find({});
            const services = await cursor.limit(count).toArray();
            res.send(services);
            console.log(services)
        });
        // app.get('/services', async (req, res) => {
        //     const query = {}
        //     const cursor = serviceCollection.find(query);
        //     const services = await cursor.toArray();
        //     res.send(services);
        //     console.log(services)
        // });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });


        //review api
        app.get('/reviews', async (req, res) => {
            let query = {};

           
             // if (req.query.service_id) {
            //     query = {
            //         service_id: req.query.service_id
            //     }
            // }
             // if (req.query.email) {
            //     query = {
            //         email: req.query.email
            //     }
            // }

            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });






        // app.patch('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const status = req.body.status
        //     const query = { _id: ObjectId(id) }
        //     const updatedDoc = {
        //         $set:{
        //             status: status
        //         }
        //     }
        //     const result = await orderCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })


    }
    finally {

    }

}

run().catch(err => console.error(err));


app.listen(Port, () => {
    console.log("quick eat server is running", Port);
})