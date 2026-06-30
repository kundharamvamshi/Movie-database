import {Component} from 'react'

import Navbar from '../../components/Navbar'
import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import LoadingView from '../../components/Loader'

import {POPULAR_MOVIES_API} from '../../utils/constants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {page} = this.state

    const response = await fetch(`${POPULAR_MOVIES_API}&page=${page}`)

    if (response.ok) {
      const data = await response.json()

      this.setState({
        movies: data.results,
        totalPages: data.total_pages,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onPreviousPage = () => {
    this.setState(
      prevState => ({
        page: prevState.page - 1,
      }),
      this.getPopularMovies,
    )
  }

  onNextPage = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.getPopularMovies,
    )
  }

  renderSuccessView = () => {
    const {movies, page, totalPages} = this.state

    return (
      <>
        <MovieGrid movies={movies} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPreviousPage={this.onPreviousPage}
          onNextPage={this.onNextPage}
        />
      </>
    )
  }

  renderLoadingView = () => <LoadingView />

  onRetry = () => {
    this.getPopularMovies()
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

  renderPopularMovies = () => {
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
      <div className="popular-page">
        <Navbar />

        <div className="popular-content">{this.renderPopularMovies()}</div>
      </div>
    )
  }
}

export default Popular
