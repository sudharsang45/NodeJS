var express = require('express');
var router = express.Router();
const client = require('../mongoConfig/developerConnection');
const { ObjectId } = require('mongodb');

// Get all developers

router.get('/all', async function(req, res, next) {
    try {
        await client.connect();
        const collection = client.db('developers').collection('developer');
        const developers = await collection.find().toArray();
        res.send(developers);
    }
    catch(err){
        res.status(500).send("Error processing request");
    }
});

// Get developer by ID
router.get('/:_id', async function(req, res, next) {
    try {
        await client.connect();
        const collection = client.db('developers').collection('developer');
        const developer = await collection.findOne({ _id: new ObjectId(req.params._id) });
        if (!developer) {
            res.status(404).send('Developer not found');
        }
        else {
            res.send(developer);
        }
    }
    catch(err){
        res.status(500).send("Error processing request");
    }
});

// create developer
router.post('/addDeveloper', async function(req, res, next) {
    try {
        await client.connect();
        const collection = client.db('developers').collection('developer');
        if(!req.body.firstName || !req.body.lastName || !req.body.favouriteLanguage || !req.body.yearStarted) {
            res.status(400).send('All fields are required');
        }
        else {
            const newDeveloper = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                favouriteLanguage: req.body.favouriteLanguage,
                yearStarted: req.body.yearStarted
            };
            await collection.insertOne(newDeveloper);
            res.status(201).send(newDeveloper);
        }
    }
    catch(err){
        res.status(500).send("Error processing request");
    }    
});

//update a developer
router.put('/update', async function(req, res, next) {
    try {
        await client.connect();
        const collection = client.db('developers').collection('developer');
        const developer = await collection.findOne({ _id: new ObjectId(String(req.body._id))});
        if(!developer){
            res.status(404).send('developer not found');
        }
        else {
            developer.firstName = req.body.firstName,
            developer.lastName = req.body.lastName,
            developer.favouriteLanguage = req.body.favouriteLanguage,
            developer.yearStarted = req.body.yearStarted
            collection.updateOne({ _id: developer._id}, { $set: developer});
            res.send(developer)
        } 
    }
    catch(err){
        res.status(500).send("Error processing request");
    } 
});

// delete a developer

router.delete('/delete', async function(req, res, next){
    try {
        await client.connect();
        const collection = client.db('developers').collection('developer');
        const developer = await collection.findOne({ _id: new ObjectId(String(req.body._id))});
        if(!developer){
            res.status(404).send('developer not found');
        }
        else {
            collection.deleteOne({ _id: developer._id });
            res.status(201).send('developer deleted');
        }

    }
    catch(err) {
        res.status(500).send("Error processing request");
    }
});

module.exports = router;