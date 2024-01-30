import { Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
//import { MovieCard } from "../movie-card/movie-card";
import moment from "moment";

export const MovieView = ({ movies, removeFavoriteMovie, addFavoriteMovie }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);
  const user = JSON.parse(localStorage.getItem("user"));
  //const FavoriteMovies = {user.FavoriteMovies};
  
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
            <Button className="fav-btn" onClick={() =>removeFavoriteMovie(movie.id)}>remove</Button>
          ) : (
            <Button className="fav-btn" onClick={() => addFavoriteMovie(movie.id)}>Favorite</Button>
          )}
          </div>
          <div className="d-flex justify-content-center">
            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
          </div>  
        </Col>
      </Row>
    </>
  );
};