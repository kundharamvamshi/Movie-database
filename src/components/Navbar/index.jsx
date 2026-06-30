import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Navbar extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    const {history} = this.props
    const {searchInput} = this.state

    if (searchInput.trim() !== '') {
      history.push(`/search?query=${searchInput}`)
    }
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.onSearch()
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <h1 className="logo">movieDB</h1>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Popular
            </Link>
          </li>

          <li>
            <Link to="/top-rated" className="nav-link">
              Top Rated
            </Link>
          </li>

          <li>
            <Link to="/upcoming" className="nav-link">
              Upcoming
            </Link>
          </li>
        </ul>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchInput}
            onChange={this.onChangeSearch}
            onKeyDown={this.onKeyDownSearch}
            className="search-input"
          />

          <button type="button" className="search-btn" onClick={this.onSearch}>
            Search
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
