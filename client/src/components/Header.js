import React, { useEffect, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Header() {
    const[movies,setMovies] = useState([])
    const [random,setRandom]= useState()
    useEffect(()=>{
        const inter = setInterval(()=>{
            setRandom(Math.floor(Math.random()*100))
        },10000)
        return ()=>clearInterval(inter)
    })

    
    useEffect(async()=>{
        const{data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=2f2c8999803cb7f300f78efe71f1546f&with_networks=213`)
        setMovies(data.results[Math.floor(Math.random()*data.results.length)])
        return ()=>{
            setMovies([])
        }
         
    },[random])
    const substring =(str,n)=>{
        return str?.length >n ? str.substring(0,n-1) + "..." :str
    }
    return (
        <header className='header_container'
           style={{
               backgroundSize:'cover',
               backgroundPosition:'center center',
               backgroundImage:`url(
                   "https://image.tmdb.org/t/p/original/${movies?.backdrop_path}"
               )`
           }}
        
        >   <div className='baner'>
               <img className='baner_avata' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' alt=''/>
               <div className='group_btn'>
                 <Link to='/signin' className='signin_Btn' >
                     <div >Sign In</div>
                 </Link>
                 <Link to='/signup' className='signup_Btn' >
                     <div >Sign Up</div>
                 </Link>
               </div>
            </div>

           <div className='header_contents' >
              <h1 className='header_title'>
                  {movies?.title || movies?.name || movies?.original_name}
              </h1>
              <h1 className='header_description'>{substring(movies?.overview,150)}</h1>
           </div>
           
        </header>
    )
}

export default Header