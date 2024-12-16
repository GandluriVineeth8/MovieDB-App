import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import MovieCard from '../MovieCard'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class PopularMovies extends Component {
  state = {
    status: diffStates.inProgress,
    movieData: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const API_KEY = '91586a1718ce8a4af40ad961b7d7533c'
    const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    try {
      const response = await fetch(getPopularMoviesURL)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({status: diffStates.success, movieData: updatedData})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }

  renderSuccessView = () => {
    const {movieData} = this.state
    return (
      <div className="movies-container">
        <h1 className="heading">Popular</h1>
        <ul className="movies-list-container">
          {movieData.map(each => (
            <MovieCard key={each.id} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderErrorView = () => (
    <div className="error-container">
      <h1>Something went wrong. Please try again later!</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderDiffrentViews()}</div>
  }
}

export default PopularMovies
