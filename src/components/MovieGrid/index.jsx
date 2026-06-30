import MovieCard from '../MovieCard'

import './index.css'

const MovieGrid = props => {
  const {movies} = props

  if (movies.length === 0) {
    return (
      <div className="no-movies-container">
        <h1>No Movies Found</h1>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
