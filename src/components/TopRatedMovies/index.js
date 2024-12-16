import {Component} from 'react'
import MovieCard from '../MovieCard'
import './index.css'

const API_KEY = '91586a1718ce8a4af40ad961b7d7533c' // Replace with your API key

class TopRatedMovies extends Component {
  state = {
    topRatedMoviesData: [],
    page: 1,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {page} = this.state
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`,
      )
      const data = await response.json()

      const updatedMovies = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path, // Fix: Ensure correct property initialization
        voteAverage: movie.vote_average,
        originalLanguage: movie.original_language,
      }))

      this.setState({topRatedMoviesData: updatedMovies})
    } catch (error) {
      console.error('Error fetching top-rated movies:', error)
    }
  }

  handleNextPage = () => {
    this.setState(
      prevState => ({page: prevState.page + 1}),
      this.getTopRatedMovies,
    )
  }

  handlePrevPage = () => {
    this.setState(
      prevState => ({page: prevState.page > 1 ? prevState.page - 1 : 1}),
      this.getTopRatedMovies,
    )
  }

  render() {
    const {topRatedMoviesData, page} = this.state

    return (
      <div className="top-rated-movies">
        <h1>Top Rated </h1>
        <div className="movies-grid">
          {topRatedMoviesData.length > 0 ? (
            topRatedMoviesData.map(movie => (
              <MovieCard key={movie.id} movieDetails={movie} />
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
        <div className="pagination-controls">
          <button
            type="button"
            onClick={this.handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button onClick={this.handleNextPage} type="button">
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default TopRatedMovies
