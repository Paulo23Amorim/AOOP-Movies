import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function MovieDetails() {
  const { id } = useParams();
  const [data, setData] = useState({ movie: {}, comments: [] });

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{data.movie.title}</h2>
      <p>{data.movie.plot}</p>
      <h3>Comments:</h3>
      <ul>
        {data.comments.map(c => (
          <li key={c._id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
}
