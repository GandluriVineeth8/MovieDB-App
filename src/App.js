import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import SingleMovie from './components/SingleMovie'
import SearchedMovies from './components/SearchedMovies'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/search/:query" component={SearchedMovies} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/movie/:id" component={SingleMovie} />
    </Switch>
  </>
)

export default App
/* <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={SingleMovie} />
          <Route exact path="/search/:query" component={SearchedMovies} 
          //import React from 'react' */
