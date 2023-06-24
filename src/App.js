import "./App.css";
import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopular(result);
    });
  }, []);

  const PopularList = () => {
    return popular.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="movie-date">rilis: {movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length) {
      const query = await searchMovie(q);
      setPopular(query.results);
      console.log(query);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Movie in</h1>
        <input
          placeholder="find your favorite movie"
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularList />
        </div>
      </header>
    </div>
  );
};

export default App;
