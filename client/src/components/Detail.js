import React, { useEffect, useState } from 'react'
import './detail.css'
import {  useParams} from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import {
    img_500,
    unavailable,
   img_300, noPicture 
  } from '../config';
import axios from 'axios'
import NotiModal from './NotiModal';
import { useSelector } from 'react-redux';
function Detail() {
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [credits, setCredits] = useState([]);
    const[upcoming,setUpcoming] = useState([])
    const[showNoti,setShowNoti] = useState(false)
    const{user} = useSelector(state=>state.userDetail)
    const{id} = useParams()
    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=2f2c8999803cb7f300f78efe71f1546f&language=en-US`
        );
    
        setContent(data);
      };
      const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2f2c8999803cb7f300f78efe71f1546f&language=en-US`
        );
    
        setVideo(data.results[0]?.key);
      };
      const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=2f2c8999803cb7f300f78efe71f1546f&language=en-US`
        );
        setCredits(data.cast);
      };
      const fetchUpcoming = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=2f2c8999803cb7f300f78efe71f1546f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );
        setUpcoming(data.results);
      };
      useEffect(() => {
        fetchData();
        fetchVideo();
        fetchCredits()
        fetchUpcoming()
        // eslint-disable-next-line
      }, [id]);
      const handleWatchMovie =()=>{
           setShowNoti(true)

      }
    return (
        <div className='detail__container'>
            {showNoti && <NotiModal setShowNoti={setShowNoti}/>}
            <div className='detail__header'>
                <img className='detail-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158' />
                <div className='detail-search'>
                    <input className='detail-input' type='text' placeholder='Search : movie,director ...' />
                    <input className='detail-icon' />
                </div>
            </div>
            <div className='adverti_container'>
            <img alt="ae88802" src="https://i.imgur.com/aSjAyNw.gif" width="1020" height="90" border="0" />
            </div>
            <ul className='detail__type'>
                <li className='detail-item'>Top Movies</li>
                <li className='detail-item'>Category</li>
                <li className='detail-item'>Countries</li>
                <li className='detail-item'>Free Movies</li>
                <li className='detail-item'>Popular Movies</li>
                <li className='detail-item'>Just Aired Episodes</li>
            </ul>
            <div className='detail__body'>
                <div className='detail__thankyou'>Hãy truy cập PHIMMOI bằng tên miền mới của chúng tôi EZPHIMMOI.NET. Xin cám ơn đã ủng hộ.</div>
                <div className='detail__content-container'>
                <div key={content?.id} className='detail__content-main'>
                 <div className='detail__content-left_wrapper'>
                    <div  className='detail__content-left'>
                    <img className='detail__content-poster' src={
                    content?.poster_path
                      ? `${img_500}/${content?.poster_path}`
                      : unavailable
                  }
                  alt={content?.name || content?.title} />
                        <div className='detail__content-button'>
                            <a className='detail-link trailer'  target="__blank" href={`https://www.youtube.com/watch?v=${video}`} >
                                Trailer
                            </a>
                            {user?.user.subscription ? (
                                  <a target="__blank" href={`https://www.google.com/search?q=${content?.title}`} className='detail-link trailer'  >Watch</a>
                            ):(
                            <div onClick={handleWatchMovie} className='detail-link'  >Buy</div>
                            )}
                        </div>
                    </div>
                    <div className='detail__content-right'>
                        <h1 className='detail__content-title'>{content?.name || content?.title} (
                    {(
                      content?.first_air_date ||
                      content?.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )</h1>
                        <div className='detail__content-info'>
                            <div  className='i_list'>Status: <span className='red'>{content?.status}</span></div>
                            <div  className='i_list'>Country: <span className='color'>{content?.production_countries[0].iso_3166_1}</span></div>
                            <div  className='i_list'>Date: <span className='color'>{content?.release_date}</span></div>
                            <div  className='i_list'>Quanlity:<span className='grey'>Good</span>  </div>
                            <div  className='i_list'>Language: <span className='grey'>English</span>  </div>
                            <div  className='i_list'>Tagline:<span className='color'>{content?.tagline}</span>  </div>
                            <div  className='i_list'>Production: <span className='grey'>Updating</span> </div>
                        </div>
                        <div className='detail__content-rating'>
                            <div className='rating'>Rating</div>
                            <div className='star'>
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                            </div>
                        </div>
                        <h2>Actor</h2>
                        <div className='detail__content-actors'>
                            {credits.map(c=>(
                            <img key={c.id} className='actor_poster' src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                            alt={c?.name} />
                            ))}
                        </div>
                    </div>
                    </div>
                  <div className='detail__noidung' >
                      <div className='detail__noidung-title'>
                           <h3>Content</h3>
                           <div className='detail__noidung-btngroup'>
                               <span className='like'><ThumbUpAltIcon style={{fontSize:'medium'}} /> Like</span>
                               <span className='share'>Share</span>
                           </div>
                      </div>
                      <h1 className='detail__content-title'>{content?.name || content?.title}</h1>
                      <p>{content?.overview}</p>
                  </div>
                </div>
                
                <div className='detail__content-right_container'>
                  <div className='right__star'>
                      <img style={{width:'50px'}}  src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                      <div className='hotMovies'>HOT MOVIES</div>
                  </div>
                  <div className='right__list-coming'>
                     <div className='right__bigtrailer'>
                      <div className='right__movie-title'>Hanh phuc:Chung cu co doc</div>
                      <div className='right__movie-bottom'>
                            <div className='star'>
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                            </div>
                            <div className='view'>6.1k viewer</div>
                      </div>
                      <div className='hd_trailer'> Trailer</div>
                    </div>
                    <ul className='next__movies-lists'>
                        {upcoming.map(u=>(
                        <li key={u.id} className='next__movies-item'>
                            <img className='next__movies-poster'  src={u?.poster_path
                      ? `${img_500}/${u?.poster_path}`
                      : unavailable}/>
                            <div className='next__movies-info'>
                                <div className='info-title'>{u?.name||u?.title}</div>
                                <div className='small'>{u?.popularity}K viewer</div>
                                <div className='star'>
                                   <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                   <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                   <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                   <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                   <img className='star-img' src='https://ezphimmoi.net/media/img/star-on.png' alt='' />
                                </div>
                            </div>
                            <div className='next__movies-trailer'>Trailer</div>
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
            </div>
            <div className='detail__bottom'>
                <div className='copyright'>
                Copyright 2021 © <span className='color'>Netflix.com</span>
                <br/>
                Xem phim mới miễn phí nhanh chất lượng cao. Xem Phim online Việt Sub, Thuyết minh, lồng tiếng chất lượng HD. Xem phim nhanh online chất lượng cao <span className='color'>KUBET</span> 
                </div>
                <ul className='phimmoi'>
                    <div className='phimmoi-title'>Hot Movies</div>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                </ul>
                <ul className='phimmoi'>
                    <div className='phimmoi-title'>Hot TV Show</div>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                </ul>
                <ul className='phimmoi'>
                    <div className='phimmoi-title'>Coming Soon</div>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                    <li className='phimmoi-item'>Top Movies</li>
                </ul>
                <div className='bottom_email'>
                    <PhoneIcon style={{fontSize:'3rem'}} />
                    <div className='emil_contact'>
                        Email:
                        <br />
                        ntluongbn95@gmail.com
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
