import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovie, addComment, deleteComment } from '../services/commentService';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchMovie(id).then(data => {
      console.log(data);
      setMovie(data.movie);
      setComments(data.comments || []);
    });
  }, [id]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    const created = await addComment(id, newComment);
    setComments(prev => [...prev, created]);
    setNewComment("");
  };

  const handleDelete = async (commentId) => {
    await deleteComment(id, commentId);
    setComments(prev => prev.filter(c => c._id !== commentId));
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
      <h1>{movie.title}</h1>
      <p><strong>Year:</strong> {movie.year || 'N/A'}</p>
      <img src={movie.poster || 'https://via.placeholder.com/300x450'} alt={movie.title} style={{ width: '300px' }} />

      <h2 style={{ marginTop: '30px' }}>Comentários</h2>
      <ul>
        {comments.map(c => (
          <li key={c._id} style={{ marginBottom: '10px' }}>
            {c.text}
            <button onClick={() => handleDelete(c._id)} style={{ marginLeft: '10px', color: 'red' }}>Remover</button>
          </li>
        ))}
      </ul>

      <input
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Escreve um comentário"
        style={{ padding: '8px', width: '70%' }}
      />
      <button onClick={handleAdd} style={{ padding: '8px 16px', marginLeft: '10px' }}>Adicionar</button>
    </div>
  );
}
