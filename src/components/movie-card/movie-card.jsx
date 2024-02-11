import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFavoriteMovie, removeFavoriteMovie, isFavorite }) => {

  return (
    <Card className="h-100">
       <div>
          {isFavorite ? (
            <HeartFill size={30} className="fav-button m-2" onClick={() => removeFavoriteMovie(movie.id)}/>
          ) : (
            <Heart size={30} className="fav-button m-2" onClick={() => addFavoriteMovie(movie.id)}/>
          )}
        </div>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="justify-content-center">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired
    }),
    image: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired
};