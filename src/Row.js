// Row.js
import React, { useEffect, useState } from "react";
import axios from "./axios";
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
function Row({ title, fetchUrl , isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl ,setTrailerUrl]=useState("");

  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fetchUrl) {
            console.log("URL Not found");
        }
        const response = await axios.get(fetchUrl);
   
        setMovies(response.data.results);
        return response;
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } 
    };
   
    fetchData();
  }, [fetchUrl]);
  
  // Options for the YouTube player (optional)
   const opts = {
    height: '390',
    width: '100%',
    playerVars: {
   // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  ///from video
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name ||movie?.original_title|| '')
        .then((url) => {
         { /* // https://www.youtube.com/watch?v=XtMThy8QKqU */}
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get('v');
  
          if (videoId) {
            setTrailerUrl(videoId);
          } else {
            // If video ID is not found, you may handle it accordingly
            console.log('Video ID not found');
          }
        })
        .catch((error) => console.log(error));
    }
  };
  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl('');
  //   } else {
  //     movieTrailer(movie?.name || '')
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         const videoId = urlParams.get('v');

  //         if (videoId) {
  //           setTrailerUrl(videoId);
  //         } else {
  //           console.log('Video ID not found');
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };


  return (
    <div className="row-container">
      <h2>{title}</h2>
      <div className="row-posters">
         {/*several movies poster*/} 
         {movies.map (movie=>(
          //from api poster_path we get path like "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg" 
          <img key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row-poster ${isLargeRow &&"row-posterLarger"}`}
          // src={`${baseImgUrl}${
          //   isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} //he works like this but i prefer 
          src={`${baseImgUrl}${
            isLargeRow ? movie.poster_path : movie.poster_path}`} alt={movie.name}
            />
         ))}

      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
   
    </div>
  );
}

export default Row;
