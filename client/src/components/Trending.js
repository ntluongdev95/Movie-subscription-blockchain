import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleMovie from './SingleMovie'
import './trending.css'
function Trending() {
    const[content,setContent] = useState([])

    const fetchTrending=async()=>{
          const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=2f2c8999803cb7f300f78efe71f1546f`)
          setContent(data.results)
    }
    useEffect(()=>{
        fetchTrending()
    },[])
    return (
        <div className='trending_wrapper'>
           <span className="pageTitle">Trending Today</span>
           <div className='trending'>
           {content &&
          content.map((c) => (
            <SingleMovie
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
           </div>
        </div>
    )
}

export default Trending
