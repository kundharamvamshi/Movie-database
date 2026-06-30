/* eslint-disable */

import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Navbar from '../../components/Navbar'
import LoadingView from '../../components/Loader'
import CastCard from '../../components/CastCard'

import {MOVIE_DETAILS_API, API_KEY, IMAGE_URL} from '../../utils/constants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    movie: {},
    cast: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {
      match: {
        params: {id},
      },
    } = this.props

    const movieResponse = await fetch(
      `${MOVIE_DETAILS_API}/${id}?api_key=${API_KEY}&language=en-US`,
    )

    const castResponse = await fetch(
      `${MOVIE_DETAILS_API}/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )

    if (movieResponse.ok && castResponse.ok) {
      const movieData = await movieResponse.json()
      const castData = await castResponse.json()

      this.setState({
        movie: movieData,
        cast: castData.cast,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => <LoadingView />

  onRetry = () => {
    this.getMovieDetails()
  }
  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="failure-heading">Something went wrong</h1>

      <p className="failure-description">Please try again.</p>

      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movie, cast} = this.state

    const {
      title,
      poster_path,
      vote_average,
      runtime,
      genres,
      release_date,
      overview,
    } = movie

    const genreNames =
      genres && genres.length > 0
        ? genres.map(each => each.name).join(', ')
        : 'N/A'

    const posterUrl = poster_path
      ? `${IMAGE_URL}${poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'

    return (
      <div className="movie-details-container">
        <div className="movie-info-container">
          <img src={posterUrl} alt={title} className="movie-details-image" />

          <div className="movie-content">
            <h1 className="movie-name">{title}</h1>

            <p className="movie-rating">⭐ {vote_average}</p>

            <p className="movie-runtime">
              <span className="label">Duration:</span> {runtime} mins
            </p>

            <p className="movie-genre">
              <span className="label">Genres:</span> {genreNames}
            </p>

            <p className="movie-release-date">
              <span className="label">Release Date:</span> {release_date}
            </p>

            <h2 className="overview-heading">Overview</h2>

            <p className="overview-text">{overview}</p>
          </div>
        </div>

        <h2 className="cast-heading">Cast</h2>

        <div className="cast-grid">
          {cast.map(eachCast => (
            <CastCard
              key={eachCast.cast_id || eachCast.credit_id}
              cast={eachCast}
            />
          ))}
        </div>
      </div>
    )
  }
  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-page">
        <Navbar />

        <div className="movie-details-content">{this.renderMovieDetails()}</div>
      </div>
    )
  }
}

export default withRouter(MovieDetails)
