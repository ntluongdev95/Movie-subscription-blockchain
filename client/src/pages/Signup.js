import React, { useEffect, useState } from 'react'
import './signup.css'
import{Link} from 'react-router-dom'
import{useDispatch} from 'react-redux'
import { userSignupAction } from '../redux/actions/userAction'
import {validate} from '../utils/validate'
function Signup() {
    const[showPw,setShowPw] = useState(false)
    const dispatch = useDispatch()
    const[data,setData] = useState({
        userName:'', email:'', password:'',confirm:''
    })
    const{userName,email,password,confirm} = data
    const onChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
     }
    const[errors,setErrors] = useState({})
    
    useEffect(()=>{
        const clearError =setTimeout(()=>{
            setErrors({})
        },5000)
        return ()=>clearTimeout(clearError)
    })

    const handleSignUp=(e)=>{
       e.preventDefault()
       setErrors(validate(data))
       dispatch(userSignupAction({name:userName,email,password}))
       setData({
         userName:'', email:'', password:'',confirm:''
       })
    }
    
    return (
        <div className='signup_container'> 
        <div className='signup_layer'>
            <div className='signup_header'>
                <img className='signup_avata' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' alt=''/>
                <div className ='signup_right'>
                    <span className='span'>Already have an account?</span>
                    <Link to='/signin'>Sign in </Link>
                </div>
            </div> 
               <div className='signin_form'>
               <div className='signin_form-wrapper'>
                   <h1 className='signin_title'>Sign Up</h1>
                   <form onSubmit={handleSignUp} className='form_control' >
                      <div className='email name'>
                           <input type='text' placeholder='Name' name='userName' value={userName}  onChange={onChange}/>
                       </div>
                       {errors.userName && 
                           <p className='error'>{errors.userName}</p>}
                       <div className='email'>
                           <input type='text' placeholder='Email' name='email' value={email}  onChange={onChange}/>
                       </div>
                       {errors.email && 
                           <p className='error'>{errors.email}</p>}
                       <div className='password'>
                           <input type={showPw ?'text':'password' }placeholder='Password' name='password' value={password}  onChange={onChange} />
                           <span onClick={()=>setShowPw(!showPw)} className='showPw'>{showPw? 'Hide':'Show'}</span>
                       </div>
                       {errors.password && 
                           <p className='error'>{errors.password}</p>}
                       <div className='password'>
                           <input type='password' placeholder='Confirm Password' name='confirm' value={confirm}  onChange={onChange} />
                       </div>
                       {errors.confirm && 
                           <p className='error'>{errors.confirm}</p>}
                       <button type='click' className='form_btn'>Create account</button>
                   </form>
               </div>   
            </div>  
            </div>
            </div>
    )
}

export default Signup
