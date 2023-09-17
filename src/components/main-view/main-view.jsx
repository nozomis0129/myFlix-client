import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Godfather",
      Description: "Michael, the young and idealistic son of Vito Corleone, the head of the most powerful Mafia clan in Ner York, returns home as a war hero and is determined to live his own life. But tragic circumstances make him face the legacy of his family.",
      Director: {
        Name: "Francis Ford Coppola",
        Bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.",
        Birth: 1939
      },
        ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
        Release: 1972,
        Featured:false
    },
    {
      id: 2,
      Title: "Eternal Sunshine Of The Spotless Mind","Description":"Joel Barish is shocked to discover that the love of his life, Clementine, has had erased from her memory. As a result, hurt and angry, Joel wants to pay her back in the same coin, going as far as to undergo a painless but intricate medical procedure to do the same. And as the once-cherished recollections of Clementine gradually fade away, giving away to a soulless black void, something happens. Now Joel has second thoughts, toying with the idea of stopping the irreversible process.",
      Genre: {
        Name: "Romance",
        Description:"Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
      },
      Director: {
        Name: "Michel Gondry",
        Bio: "Michel Gondry is a French filmmaker noted for his inventive visual style. He won an Academy Award for Best Original Screenplay as one of the writers of the 2004 film Eternal Sunshine of the Spotless Mind, which he also directed.",
        Birth: 1963
      },
      ImagePath: "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png",
      Release: 2004,
      Featured: false
    },
    {
      id: 3,
      Title: "Pulp Fiction",
      Description: "The lives of two hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      Genre: {
        Name: "Crime",
        Description: "Crime film is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection."
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Jerome Tarantino is an American film director, screenwriter, producer, actor, and author.",
        Birth: 1963
      },
      ImagePath: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
      Release: 1994,
      Featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectdMovie) => {
            setSelectedMovie(newSelectdMovie);
          }}
        />  
      ))}
    </div>
  );
};