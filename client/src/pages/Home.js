import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router';
import './home.css'

//import { connect } from '../redux/actions/blockchainAction'
function Home() {
    const navigate = useNavigate();
    const userSignup = useSelector(state=>state.userSignup)
     const{userDK} = userSignup
     useEffect(()=>{
         if(userDK){
             navigate('/movie')
         }
     },[userDK,navigate])
    return (
        <div className='main'>
            <Header />
        </div>
    )
}

export default Home