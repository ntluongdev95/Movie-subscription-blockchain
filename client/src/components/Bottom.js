import React from "react";
import { makeStyles } from "@mui/styles";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "black",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation({setTrending,setMovies,setTv,setSearch}) {
  const classes = useStyles();
  const handleMovieChange =()=>{
    setTrending(false)
    setTv(false)
    setSearch(false)
    setMovies(true)
  }
  const handleTrendingChange =()=>{
    setTrending(true)
    setTv(false)
    setSearch(false)
    setMovies(false)
  }
  const handleTvChange =()=>{
    setTrending(false)
    setTv(true)
    setSearch(false)
    setMovies(false)
  }

  
  return (
    <BottomNavigation
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={handleTrendingChange}
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction onClick={handleMovieChange}
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction onClick={handleTvChange}
        style={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
    }