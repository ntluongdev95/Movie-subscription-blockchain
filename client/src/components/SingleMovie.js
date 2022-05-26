import React from 'react'
import{img_300,unavailable} from '../config'
import Badge from '@mui/material/Badge';
import './singleMovie.css'
import {Link} from 'react-router-dom'
function SingleMovie({id,
    poster,
    title,
    date,
    media_type,
    vote_average,}) {
        const handleClickDetail =()=>{
            
        }
    return (
        <div onClick={handleClickDetail}  className='media'>
            <Badge badgeContent={vote_average} color={ vote_average >6 ?"primary" :"secondary"}/>
            <Link className='poster' to={`/movie/${id}`}>
                <img className='img-poster'
                 src={poster? `${img_300}${poster}`:unavailable}
                />
            </Link>
            <b className='post_title'>{title.length >20 ? title.substring(0,19)+"...":title}</b>
            <span className='subTitle'>
                {media_type==='tv'?'TV Series':'Movie'}
                <span className='subTitle'>{date}</span>
            </span>
        </div>    
        
    )
}

export default SingleMovie
