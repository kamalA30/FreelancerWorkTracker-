const { MongoClient } = require('mongodb');

const url = '';

const dbConnect = (collectionName, cb) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async (client) => {
            const db = client.db('').collection(collectionName);
            await cb(db);
            client.close();
        })
        .catch((error) => {
            console.error('Connection error:', error);
        });
};

module.exports = dbConnect;
