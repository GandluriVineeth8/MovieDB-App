import {Component} from 'react'
import MovieCard from '../MovieCard'

const API_KEY = '91586a1718ce8a4af40ad961b7d7533c' // Replace with your actual API key

class UpcomingMovies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upcomingMovies: [],
      page: 1,
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const {page} = this.state // Destructure `page`
    this.setState({loading: true, error: null})

    try {
      const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      const response = await fetch(upcomingMoviesURL)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      this.setState({
        upcomingMovies: data.results || [],
        loading: false,
      })
    } catch (error) {
      this.setState({error: error.message, loading: false})
      console.error('Error fetching movies:', error)
    }
  }

  handleNextPage = () => {
    this.setState(prevState => ({page: prevState.page + 1}), this.fetchMovies)
  }

  handlePrevPage = () => {
    this.setState(
      prevState => ({page: prevState.page > 1 ? prevState.page - 1 : 1}),
      this.fetchMovies,
    )
  }

  render() {
    const {upcomingMovies, page, loading, error} = this.state // Destructure `state`

    return (
      <div className="upcoming-movies">
        <h1 className="movies-heading">Upcoming Movies</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="movies-grid">
          {!loading && !error && upcomingMovies.length > 0
            ? upcomingMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movieDetails={{
                    id: movie.id,
                    title: movie.title,
                    posterPath: movie.poster_path,
                    voteAverage: movie.vote_average,
                    originalLanguage: movie.original_language,
                  }}
                />
              ))
            : !loading && <p>No upcoming movies available.</p>}
        </div>

        <div className="pagination-controls">
          <button
            type="button"
            onClick={this.handlePrevPage}
            disabled={page === 1 || loading}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            type="button"
            onClick={this.handleNextPage}
            disabled={loading || upcomingMovies.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default UpcomingMovies
