import {Component} from 'react'
import MovieCard from '../MovieCard'

const API_KEY = '91586a1718ce8a4af40ad961b7d7533c' // Use an environment variable for API security

class SearchedMovies extends Component {
  state = {
    searchedMovies: [],
    loading: true,
    error: null,
    page: 1,
  }

  componentDidMount() {
    this.getSearchedMovies()
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

  getSearchedMovies = async () => {
    const {match} = this.props
    const {query} = match.params
    const {page} = this.state
    console.log(page)

    this.setState({loading: true, error: null}) // Reset loading and error states

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=2`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`)
      }

      const data = await response.json()
      const updatedData = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        originalLanguage: movie.original_language,
      }))

      this.setState({searchedMovies: updatedData, loading: false})
    } catch (error) {
      console.error('Error fetching movies:', error)
      this.setState({error: error.message, loading: false})
    }
  }

  render() {
    const {searchedMovies, loading, error} = this.state
    const {match} = this.props
    const {query} = match.params
    const {page} = this.state
    console.log(page)

    return (
      <div className="searched-movies">
        <h1 className="movies-heading">{`Search Results for "${query}"`}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="movies-grid">
          {!loading && !error && searchedMovies.length > 0
            ? searchedMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movieDetails={{
                    id: movie.id,
                    title: movie.title,
                    posterPath: movie.posterPath,
                    voteAverage: movie.voteAverage,
                    originalLanguage: movie.originalLanguage,
                  }}
                />
              ))
            : !loading && <p>{`No results found for "${query}".`}</p>}
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

export default SearchedMovies
