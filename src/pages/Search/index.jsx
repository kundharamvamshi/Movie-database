import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Navbar from '../../components/Navbar'
import MovieGrid from '../../components/MovieGrid'
import Pagination from '../../components/Pagination'
import LoadingView from '../../components/Loader'

import {SEARCH_MOVIES_API} from '../../utils/constants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    const {search} = location

    if (prevProps.location.search !== search) {
      this.setState(
        {
          page: 1,
        },
        this.getSearchMovies,
      )
    }
  }

  getSearchMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {page} = this.state
    const {location} = this.props
    const {search} = location

    const searchParams = new URLSearchParams(search)
    const query = searchParams.get('query')

    const response = await fetch(
      `${SEARCH_MOVIES_API}&query=${encodeURIComponent(query)}&page=${page}`,
    )

    if (response.ok) {
      const data = await response.json()

      this.setState({
        movies: data.results,
        totalPages: Math.min(data.total_pages, 500),
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
      this.getSearchMovies,
    )
  }

  onNextPage = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.getSearchMovies,
    )
  }

  renderSuccessView = () => {
    const {movies, page, totalPages} = this.state

    if (movies.length === 0) {
      return (
        <div className="no-results-container">
          <h1 className="no-results-heading">No Movies Found</h1>
          <p className="no-results-text">
            Try searching with another movie name.
          </p>
        </div>
      )
    }

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
    this.getSearchMovies()
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

  renderSearchResults = () => {
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
    const {location} = this.props
    const {search} = location
    const searchParams = new URLSearchParams(search)
    const query = searchParams.get('query')

    return (
      <div className="popular-page">
        <Navbar />

        <div className="popular-content">
          <h1 className="page-heading">Search Results for {query}</h1>

          {this.renderSearchResults()}
        </div>
      </div>
    )
  }
}

export default withRouter(Search)
