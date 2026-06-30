import {Switch, Route} from 'react-router-dom'

import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Popular} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/movie/:id" component={MovieDetails} />
  </Switch>
)

export default App
