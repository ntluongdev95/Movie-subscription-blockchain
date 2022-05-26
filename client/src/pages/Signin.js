import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { userLoginAction } from '../redux/actions/userAction'
import './signin.css'
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
function Signin() {
    
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[showPw,setShowPw] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userSignup = useSelector(state=>state.userSignup)
     const{userDK} = userSignup
    const handleSigninSubmit=(e)=>{
         e.preventDefault()
         dispatch(userLoginAction(email,password))
         setEmail('')
         setPassword('')
    }
    useEffect(()=>{
       if(userDK){
        toast.success("Login successed");
        navigate('/movie')
       }
    },[userDK,navigate])
    return (
        <div className='signin_container' >
            <div className='signin_layer'>
            <div className='signin_header'>
                <img className='signin_avata' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' alt=''/>
            </div>
            <div className='signin_form'>
               <div className='signin_form-wrapper'>
                   <h1 className='signin_title'>Sign In</h1>
                   <form className='form_control' onSubmit={handleSigninSubmit}>
                       <div className='email'>
                           <input type='text' placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                       </div>
                       <div className='password'>
                           <input type={showPw ?'text':'password' }placeholder='Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                           <span  onClick={()=>setShowPw(!showPw)} className='showPw'>{showPw? 'Hide':'Show'}</span>
                       </div>
                       <button type='click' className='form_btn'>Sign In</button>
                   </form>
                   <div className='signin_form-other'>
                       <div className='signin_fb'>
                           <img className='fb_logo' src='https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png' alt='' />
                           <span>Login to facebook</span>
                       </div>
                       <p>New to Netflix ? <a href='/signup' className='signup'>Sign up now</a></p>
                       <div className='learnmore'>
                       This page is protected by Google reCAPTCHA to ensure you're not a bot.
                       <a hrf='#' className='learnmore_btn'>Learn more</a>
                       </div>
                   </div>
               </div>   
            </div>
            <div className='signin_bottom'>
                <div className='phone'>Question? Call <span className='phone_number'>800 852 6334</span></div>
                <div className='policy'>
                    <div className='colum'>
                        <span className='row1'>FAQ</span>
                        <span className='row2'>Cookie Preferences</span>
                    </div>
                    <div className='colum colum2'>
                        <span className='row1'>Help Center</span>
                        <span className='row2'>Corporatate Information</span>
                    </div>
                    <div className='colum colum2'>
                        <span className='row1'>Term of Use</span>
                    </div>
                    <div className='colum colum2'>
                        <span className='row1'>Privacy</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Signin