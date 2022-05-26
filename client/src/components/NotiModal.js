import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './notiModal.css'

function NotiModal({setShowNoti}) {
    const userSignup = useSelector(state=>state.userSignup)
    const{userDK} = userSignup
    const navigate = useNavigate()
    return (
        <div className='noti__layer'>
            <div onClick={()=>setShowNoti(false)} className='close_button'>close
            </div>
            <div className='noti__content'>To watch the latest movies
            <br />
            Lets
            </div>
            <div onClick={()=> navigate(`/${userDK._id}/subscription`)} className='noti__button'>Connect Metamask</div>
            
        </div>
    )
}

export default NotiModal
