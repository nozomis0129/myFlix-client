import { Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import moment from "moment";

export const MovieView = ({ movies, removeFavoriteMovie, addFavoriteMovie }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);
  const user = JSON.parse(localStorage.getItem("user"));
  //const FavoriteMovies = {user.FavoriteMovies};
  const selectedMovie = movies.find((movie) => movie.id === movieId);
  const similarMovies = movies.filter((movie) => {
    return movie.id !== movieId && movie.genre.name === selectedMovie.genre.name;
  });
  
  return (
    <>
      <Row className="justify-content-center">
        <Col xs="auto">
            <img src={movie.image} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="w-100" md={8}>
          <Card.Body className="mb-3">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Title>Genre: {movie.genre.name}</Card.Title>
            <Card.Text>{movie.genre.description}</Card.Text>
            <Card.Title>Director: {movie.director.name}</Card.Title>
            <Card.Text>{movie.director.bio}</Card.Text>
            <Card.Title>Release Year: {moment(movie.release).utc().format("YYYY")}</Card.Title>
          </Card.Body>
        
          <div>
          {user.FavoriteMovies.includes(movie.id) ? (
            <Button className="fav-btn" onClick={() =>removeFavoriteMovie(movie.id)}>Remove from favorite</Button>
          ) : (
            <Button className="fav-btn" onClick={() => addFavoriteMovie(movie.id)}>Add to Favorite</Button>
          )}
          </div>
          <div className="d-flex justify-content-center">
            <Link to={`/`}>
              <Button className="mb-5 back-button">Back</Button>
            </Link>
          </div>
        </Col>
      </Row>
     
      <Row className="justify-content-center md={8} mb-5">
        <h2 className="text-center">Similar Movies</h2>
        {
          similarMovies.length !== 0 ?
          similarMovies.map((movie) => (
            <Col md={6} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                addFavoriteMovie={addFavoriteMovie}
                removeFavoriteMovie={removeFavoriteMovie}
                isFavorite={user.FavoriteMovies.includes(movie.id)}
              />
            </Col>
          )):<Col>
            <p className="text-center">There are no similar movies</p>
          </Col>
        }
      </Row>
    </>
  );
};