var express = require('express');
var router = express.Router();
var client = require('../mongoConfig/developerConnection');


// Get all developers

router.get('/all', async function(req, res, next) {
    await client.connect();
    const collection = client.db('developers').collection('developer');
    const developers = await collection.find().toArray();
    client.close();
    res.send(developers);
});

// Get developer by ID
router.get('/:id', function(req, res, next) {
    const developer = developers.find( dev => dev.id === parseInt(req.params.id));
    res.send(developer);
});

// create developer
router.post('/addDeveloper', function(req, res, next) {
    const newDeveloper = {
        id: developers.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favouriteLanguage: req.body.favouriteLanguage,
        yearStarted: req.body.yearStarted
    };
    developers.push(newDeveloper);
    res.status(201).send(newDeveloper);
});

//update a developer
router.put('/update', function(req, res, next) {
    const developer = developers.find(dev => dev.id === parseInt(req.body.id));
    if(!developer){
        res.status(401).send('developer not found');
    }
    else {
        developer.firstName = req.body.firstName,
        developer.lastName = req.body.lastName,
        developer.favouriteLanguage = req.body.favouriteLanguage,
        developer.yearStarted = req.body.yearStarted
        res.send(developer)
    }
});

// delete a developer

router.delete('/delete', function(req, res, next){
    const developer = developers.find(dev => dev.id === parseInt(req.body.id));
    if(!developer){
        res.status(404).send('developer not found');
    }
    else {
        const index = developers.indexOf(developer);
        developers.splice(index, 1);
        res.send('developer deleted');
    }
});

module.exports = router;