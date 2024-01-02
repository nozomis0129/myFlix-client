import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] =useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    
    fetch("https://movies-flix-app-bb16fed0a4c0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then ((response) => response.json())
      .then ((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            actors: movie.Actors,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description,
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth,
              death: movie.Director.Death
            },
            image: movie.ImagePath,
            release: movie.Release,
            featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <>
    <Row className="d-flex justify-content-center">
      {!user ? (
        <Col className="mb-5" md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} 
          />
            or
          <SignupView />
        </Col>    
        ) : selectedMovie ? (
          <Col className="d-flex justify-content-center" md={8}>
            <MovieView 
              movie={selectedMovie}
              onBlackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectdMovie) => {
                    setSelectedMovie(newSelectdMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )
      }
    </Row>
    <Row className="d-flex justify-content-center mb-5">
      <Col className="d-flex justify-content-center">
        <Button variant="secondary"
            onClick={() => {
              setUser(null); setToken(null); localStorage.clear();
            }}
          >
            Logout
        </Button>
      </Col>  
    </Row>
    </>
  );
};