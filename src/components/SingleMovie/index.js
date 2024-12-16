import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import CastCard from '../CastCard'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class SingleMovie extends Component {
  state = {
    status: diffStates.inProgress,
    movieDetailsData: [],
  }

  componentDidMount = async () => {
    const API_KEY = '91586a1718ce8a4af40ad961b7d7533c'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const MOVIE_ID = id

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`,
    )
    const responseData = await response.json()

    const updatedData = {
      adult: responseData.adult,
      backdropPath: responseData.backdrop_path,
      genreIds: responseData.genre_ids,
      id: responseData.id,
      originalLanguage: responseData.original_language,
      originalTitle: responseData.original_title,
      overview: responseData.overview,
      popularity: responseData.popularity,
      posterPath: responseData.poster_path,
      releaseDate: responseData.release_date,
      title: responseData.title,
      video: responseData.video,
      runtime: responseData.runtime,
      voteAverage: responseData.vote_average,
      voteCount: responseData.vote_count,
      tagline: responseData.tagline,
      genres: responseData.genres,
    }
    this.setState({status: diffStates.success, movieDetailsData: updatedData})
  }

  renderSuccessView = () => {
    const {movieDetailsData} = this.state
    const {
      id,
      originalLanguage,
      overview,
      backdropPath,
      posterPath,
      releaseDate,
      title,
      runtime,
      voteAverage,
      tagline,
      genres,
    } = movieDetailsData
    const imgUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`
    const imgUrlLg = `https://image.tmdb.org/t/p/w500/${posterPath}`

    return (
      <div className="specific-container">
        <img className="specific-img-sm" src={imgUrl} alt="specific-img" />
        <img className="specific-img-lg" src={imgUrlLg} alt="specific-img" />
        <div className="content-container">
          <h1 className="movie-name">{title}</h1>
          <p className="tag-line">{tagline}</p>
          <p className="description">{overview}</p>
          <div className="wrapper">
            <p className="movie-rating">IMDB {voteAverage.toFixed(1)}</p>
            <p className="movie-rating">{runtime} min</p>
            <p className="date">{releaseDate.split('-')[0]}</p>
            <p className="language">{originalLanguage.toUpperCase()}</p>
          </div>
          <div className="genre-wrapper">
            <p className="genre-name">{genres['0'].name}</p>
            <p className="genre-name">.</p>
            <p className="genre-name">{genres['1'].name}</p>
            <p className="genre-name">.</p>
            <p className="genre-name">{genres['2'].name}</p>
          </div>
          <div className="cast-container">
            <h1 className="cast">Cast</h1>
            <CastCard id={id} />
          </div>
        </div>
      </div>
    )
  }

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
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-container">
        {this.renderDiffrentViews()}
      </div>
    )
  }
}

export default SingleMovie
