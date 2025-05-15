import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://aoop-movies.onrender.com/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '30px',
        color: '#1d3557'
      }}>
        🎬 AOOP Movie Gallery
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {movies.map(movie => (
          <Link
            to={`/movies/${movie._id}`}
            key={movie._id}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={movie.poster || 'https://via.placeholder.com/300x450'}
                alt={movie.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{movie.title}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>{movie.year || 'N/A'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
