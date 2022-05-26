import React, { useEffect, useState } from 'react'
import './subscription.css'
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../redux/actions/bloackchainAction';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubAction, deleteSubAction, getPlansAction, getSubByIdAction } from '../redux/actions/planAction';
import { useParams } from 'react-router-dom';
function Subcription() {
    const[fixed,setFixed] = useState(false)
    const navigate = useNavigate();
    const {id} = useParams()
    const dispatch = useDispatch()
    const{account,contract_MM,web3} = useSelector(state=>state.blockchain)
    const userSignup = useSelector(state=>state.userSignup)
    const{userDK} = userSignup
    const{plans} = useSelector(state=>state.allPlans)
    const subscription = useSelector(state=>state.plan)
    const{plan} = subscription
    const[active,setActive] = useState(plan?.length >0 ? plan[0]._id :'626c9aa437987b9b8e2e1061')
    const[planId,setPlanId] = useState(plan?.length >0 ? plan[0]._id :'626c9aa437987b9b8e2e1061')
    const[price,setPrice] = useState(plan?.length >0 ? plan[0].price :'0.01')
    const handlePlan =(p,e)=>{
        setActive(e.target.getAttribute('id'));
        setPlanId(p._id)
        setPrice(p.price)
    }
    useEffect(()=>{
        const scroll = window?.addEventListener('scroll',()=>{
             if(window.scrollY >230){
                 setFixed(true)
             }else{
                 setFixed(false)
             }
         })
         return ()=>{
            window?.removeEventListener('scroll',scroll)
         }
    },[window])
    useEffect(()=>{
        dispatch(getPlansAction())
        dispatch(getSubByIdAction(id))
    },[dispatch,id])
    useEffect(()=>{
        window.scroll(0, 0);
        if(userDK){
            dispatch(connect())
        }
    },[dispatch,userDK])
    
    const handleSubscriptionClick =()=>{
        const userToBytes32 = web3.utils.sha3(userDK._id)
        const planToBytes32 = web3.utils.sha3(planId)
        if(account !=null){
            contract_MM?.methods.Subcribe(userToBytes32,planToBytes32).send({
                from:account,
                value:web3.utils.toWei(String(price),"ether")
            }).then(receipt=>{
                dispatch(createSubAction({planId,
                   wallet: account}))
                navigate('/movie')
            })
        }else{
            alert("Please login Metamask frist")
        }
    }
    const handleDeleteSubscriptionClick =()=>{
        const userToBytes32 = web3.utils.sha3(userDK._id)
        if(account !=null){
            contract_MM?.methods.deleteSubscription(userToBytes32).send({
                from:account,
            }).then(receipt=>{
                console.log(receipt);
                dispatch(deleteSubAction({planId:plan[0]._id}))
                navigate('/movie')
            }).catch(error=>{
                console.log(error);
            })
        }else{
            alert("Please login Metamask frist")
        }
    }
   /* useEffect(()=>{
       contract_Infura?.events.SubscriptionCreated({
           filter:{},
           fromBlock:"latest"},(error,data)=>{
               if(error){
                   console.log(error);
               }else{
                console.log(data);
               }
           })
    },[]) */
    
    
    return (
        <div className='sub__layer'>
            <ToastContainer autoClose={3000} />
            <div className='sub__header'>
                <img onClick={()=>navigate('/movie')} className='sub-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' alt='' />
                <div className='sub__header-right'>
                {account && (
                 <span className='account'>{`${account?.substring(0,5)}...${account?.substring(account.length -4)}`}</span> 
                 )}
                <img className='metamask' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/440px-MetaMask_Fox.svg.png' alt='' />
                </div>
            </div>
            <div className='sub_body'>
                <h1 className='sub__title'>Choose the plan that’s right for you</h1>
                <ul className='sub__benefits'>
                     <li className='sub-item'>
                         < DoneIcon style={{color:'red'}} />
                         <span>Watch all you want. Advert-free.</span>
                     </li>
                     <li className='sub-item'>
                         < DoneIcon style={{color:'red'}}/>
                         <span>Recommendations just for you.</span>
                     </li>
                     <li className='sub-item'>
                         < DoneIcon style={{color:'red'}} />
                         <span>Change or cancel your plan anytime.</span>
                     </li>
                </ul>
                <div className='sub_body-table'>
                    <div className={fixed ?'sub__options fixed':'sub__options' }>
                          {plans?.map((p,index)=>(
                         <div  key={p._id} id={p._id} onClick={(e)=>handlePlan(p,e)} className={`option ${active==p._id && 'active'}`}>{p.name}</div> ))}
                    </div>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Monthly price</td>
                                {plans?.map((p,index)=>(
                                <td  key={p._id}>{p.price} ETH</td>))}
                            </tr>
                            <tr>
                                <td>Video quality</td>
                                {plans?.map(p=>(
                                <td  key={p._id}>{p.quanlity}</td>))}
                            </tr>
                            <tr>
                                <td>Resolution</td>
                                <td>480p</td>
                                <td>1080p</td>
                                <td>4K+HDR</td>
                            </tr>
                            <tr>
                                <td>Watch on your TV, computer, mobile phone and tablet</td>
                                <td><DoneIcon /></td>
                                <td><DoneIcon /></td>
                                <td><DoneIcon /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='sub_terms'>
                        <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <strong>Terms of Use </strong>for more details.</p>
                        <p>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.</p>
                    </div>
                    <div className='sub_button'>
                        {plan?.length >0 && plan[0]._id == planId && (
                        <button onClick ={handleDeleteSubscriptionClick} type='click'>Cancell</button>)}
                        {!plan?.length >0 && (
                        <button onClick ={handleSubscriptionClick} type='click'>Buy</button>)}
                        {plan?.length >0 && plan[0]._id !== planId && (
                         <button  type='click'>Change your plan</button>
                        )}
                    </div>
                </div>
            </div>
           
            <div className='sub_bottom'>

            </div> 
           
        </div>
    )
}

export default Subcription
