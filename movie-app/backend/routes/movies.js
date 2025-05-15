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

router.post('/:id/comments', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    const movieId = new ObjectId(req.params.id);
    const comment = {
      movie_id: movieId,
      text: req.body.text,
      name: "Anonymous",
      date: new Date()
    };

    const result = await db.collection('comments').insertOne(comment);
    res.status(201).json({ ...comment, _id: result.insertedId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});



router.delete('/:movieId/comments/:commentId', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection('comments').deleteOne({ 
      _id: new ObjectId(req.params.commentId),
      movie_id: new ObjectId(req.params.movieId)
    });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



module.exports = router;
