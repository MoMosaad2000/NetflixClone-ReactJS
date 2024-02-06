import React from 'react';
import './App.css';
import Nav from './Nav' ;
import Banner from './Banner';
import Row from './Row' ;
import request from './request';


function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row title="Netfelix Original " fetchUrl={request.fetchNetflixOriginals} 
      isLargeRow={true}
      />
      <Row title="Trinding Now " fetchUrl={request.fetchTrending} />
      <Row title="Top Rated " fetchUrl={request.fetchTopRated} />
      <Row title="Action Movie" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movie" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movie" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movie" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />

    </div>
  );
}

export default App;
