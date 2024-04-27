const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/phoneix';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToDatabase();
app.use(express.urlencoded({ extended: true }));

app.post('/doctors', async (req, res) => {
    const prob = req.body.prob;
    const loc = req.body.loc;

    try {
        const db = client.db();
        const collection = db.collection('Specializationcategory');

        const result = await collection.find({ Applied_areas: prob },{City:loc}).toArray();
        
        // const doccollection = db.collection('doctorcategory');   
        // const result2 = await doccollection.find({ Specialization: { $in: result.map(doc => doc.Specialization) } }).toArray();    
        
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error('Error processing data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
