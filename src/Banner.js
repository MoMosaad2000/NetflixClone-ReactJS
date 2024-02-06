import React , {useState,useEffect} from "react";
import axios from "./axios";
import request from './request';
import './Banner.css';

function Banner (){
    const [movie, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get(request.fetchNetflixOriginals);  
        setMovies(response.data.results[
                 Math.floor(Math.random() *response.data.results.length-1)
                ]);  
                return response;
        }
    
        fetchData();
      }, []);
      console.log(movie);
      function truncate (str,number){
        return str?.length >number ?str.substr(0,number-1)+"...": str;
      }
    return (
        <header className="banner" style={
            {
                backgroundSize:"cover",
                backgroundPosition: "center center" ,
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
            }
        }>
            <div className="banner-content">
               
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                {/*div>> 2 buttons*/}
                <div>
                    <button className="banner-button">Play</button>
                    <button className="banner-button">My List</button>
                </div>
                {/*discreptio */}
                    <h1 className="banner-descreption">{truncate(movie?.overview,150)}</h1>
                </div>
            <div className="banner-fadebottom"/>
          

        </header>
    );
};
export default Banner ;