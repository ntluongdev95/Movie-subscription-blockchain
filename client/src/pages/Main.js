import React, { useEffect, useState } from 'react'
import './main.css'
import Container from '@mui/material/Container';
import Trending from '../components/Trending';
import Movies from '../components/Movies';
import TV from '../components/TV';
import SimpleBottomNavigation from '../components/Bottom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUserDetailAction, logoutAction } from '../redux/actions/userAction';
import { getSubByIdAction } from '../redux/actions/planAction';

function Main() {
    const[trending,setTrending] = useState(true)
    const[movies,setMovies] = useState(false)
    const dispatch = useDispatch()
    const[tv,setTv] = useState(false)
    const userSignup = useSelector(state=>state.userSignup)
    const{userDK} = userSignup
    const{user} = useSelector(state=>state.userDetail)
    const{subscripted} = useSelector(state=>state.subscripted)
    const {cancelled} =useSelector(state=>state.cancelled)
    const navigate = useNavigate();
    const handleNavigate =()=>{
        navigate(`/${userDK._id}/subscription`)
        dispatch(getSubByIdAction(userDK._id))
    }
    const handleLogout =()=>{
        dispatch(logoutAction())
    }
    useEffect(()=>{
        if(!userDK){
            navigate('/')
        }else{
            dispatch(getUserDetailAction())
        }
    },[dispatch,userDK,navigate,subscripted,cancelled])

    return (
        <div className='main_wrapper'>
            <header className='main_header' >
                <img className='main_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' alt='' />
                <div className='main_header-right'>
                    <div className='main_header-user'>
                        <img className='user-avata' src='data:image/jpeg;base64,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' alt=''/>
                        <span className='user-name'>{userDK?.name}</span>
                    </div>
                    {user?.user.subscription?
                      <span onClick={handleNavigate}  className='user-wallet'> Member</span>:(
                    <span onClick={handleNavigate} className='user-wallet'>Subscription</span>
                    )}
                     <span onClick={handleLogout} className='user-wallet'>Logout</span>
                </div>
            </header>
            <div className='main_sections'>
                <Container>
                    {trending &&  <Trending />}
                    {movies &&  <Movies />}
                    {tv && <TV />}
                </Container>
            </div>
            <SimpleBottomNavigation setTrending={setTrending} setMovies={setMovies} 
               setTv ={setTv} 
            />
             <ToastContainer autoClose={3000} />
        </div>
       
    )
}

            

export default Main