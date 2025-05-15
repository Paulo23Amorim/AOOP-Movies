// services/commentService.js

const Movie = require('../models/Movie');

async function addComment(movieId, text) {
  const movie = await Movie.findById(movieId);
  if (!movie) throw new Error("Movie not found");

  const comment = { _id: new Date().getTime().toString(), text };
  movie.comments.push(comment);
  await movie.save();
  return comment;
}

async function deleteComment(movieId, commentId) {
  const movie = await Movie.findById(movieId);
  if (!movie) throw new Error("Movie not found");

  movie.comments = movie.comments.filter(c => c._id !== commentId);
  await movie.save();
}

module.exports = { addComment, deleteComment };
