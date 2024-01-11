import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  return (
    <>
      <Row className="mb-5">
        <Col className="w-100" md={8}>
          <div>
            <img src={movie.image} className="w-100" />
          </div>
          <div>
            <span>Title: </span>
            <span>{movie.title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.genre.name}</span>
            <div>({movie.genre.description})</div>
          </div>
          <div>
            <div>
              <span>Director: </span>
              <span>{movie.director.name}</span>
            </div>
            <div>
              <span>Bio: </span>
              <span>{movie.director.bio}</span>
            </div>
            <div>
              <span>Birth Year: </span>
              <span>{movie.director.birth}</span>
            </div>
            <div>
              <span>Death Year: </span>
              <span>{movie.director.death}</span>
            </div>
          </div>
          <div>
            <span>Actors: </span>
            <span>{movie.actors}</span>
          </div>
          <div>
            <span>Release Year: </span>
            <span>{movie.release}</span>
          </div>
          <div>
            <span>Featured: </span>
            <span>{movie.featured}</span>
          </div>
          <div className="d-flex justify-content-center">
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>
          </div>  
        </Col>
      </Row>
    </>
  );
};