/* eslint-disable */

import {Link} from 'react-router-dom'
import './index.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const MovieCard = props => {
  const {movie} = props

  const {id, title, poster_path, vote_average} = movie

  return (
    <div className="movie-card">
      <img
        src={`${IMAGE_BASE_URL}${poster_path}`}
        alt={title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h2 className="movie-title">{title}</h2>

        <p className="movie-rating">⭐ {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>

        <Link to={`/movie/${id}`}>
          <button type="button" className="details-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
