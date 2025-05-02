import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(m => (
          <li key={m._id}>
            <Link to={`/movies/${m._id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
