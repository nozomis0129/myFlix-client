import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="justify-content-center">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="primary">
          Open
        </Button>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};