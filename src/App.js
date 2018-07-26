import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

const movieTitles = [
  "Matrix",
  "Full Metal Jacket",
  "Oldboy",
  "Star Wars"
]

const movieImages = [
  "https://i.ytimg.com/vi/rBrfs_cVYO0/maxresdefault.jpg",
  "http://images.kbench.com:8080/kbench/article/2016_11/k169932p1n1.jpg",
  "https://pbs.twimg.com/media/DQnjWUPVoAANZZS.jpg",
  "http://appdata.hungryapp.co.kr/data_file/data_img/201606/15/W146596786915995241.jpg"
]

class App extends Component {

  state = {
  }

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id} 
        genres={movie.genres} 
        synopsis={movie.synopsis}
      />
    })

    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={ movies ? "App" : "App--loading" }>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
