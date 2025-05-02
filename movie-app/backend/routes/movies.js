const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'sample_mflix';

router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const movies = await db.collection('movies').find().limit(20).toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(req.params.id) });
    const comments = await db.collection('comments').find({ movie_id: new ObjectId(req.params.id) }).toArray();
    res.json({ movie, comments });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
