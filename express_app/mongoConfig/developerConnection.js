const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION;
console.log(uri);
const client = new MongoClient(uri);

module.exports = client;