/* eslint-disable */

import './index.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'

const CastCard = props => {
  const {cast} = props

  const {profile_path, original_name, character} = cast

  const imageUrl = profile_path
    ? `${IMAGE_BASE_URL}${profile_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  return (
    <div className="cast-card">
      <img src={imageUrl} alt={original_name} className="cast-image" />

      <h3 className="cast-name">{original_name}</h3>

      <p className="cast-character">{character}</p>
    </div>
  )
}

export default CastCard
