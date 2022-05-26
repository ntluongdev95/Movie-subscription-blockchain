import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleMovie from './SingleMovie'
//import PaginationRanges from './Pagination'
import Genres from './Genres'
function Movies() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const[page,setPage] = useState(1)
    const[content,setContent] = useState([])
    const fetchMovies = async()=>{
       const{data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2f2c8999803cb7f300f78efe71f1546f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
        setContent(data.results)
    
    }
    useEffect(()=>{
       window.scroll(0, 0);
       fetchMovies()
    },[page,content])
    return (
        <div >
            <span className="pageTitle">Discover Movies</span>
            <Genres
              type="movie"
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              genres={genres}
              setGenres={setGenres}
              setPage={setPage}
            />
            <div className="trending">
        {content &&
          content.map((c) => (
            <SingleMovie
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
        
       
        </div>
    )
}

export default Movies
