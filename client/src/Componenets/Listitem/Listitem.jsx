import React, { useEffect, useState } from "react";
import {Add, PlayArrow, ThumbDownAltOutlined, ThumbUpOutlined} from '@material-ui/icons'
import './Listitem.scss'
import axios from "axios";
import { Link } from "react-router-dom";
function Listitem({index,item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setmovie] = useState({})
  useEffect(() => {
    const getMovie = async () => {
     try {
       const  res  = await axios.get('/movie/find/'+item, {
                  headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      }
       })
       setmovie(res.data)
       console.log(res.data)
     } catch (error) {
       console.log(error)
     }
   }
   getMovie()
  }, [])
  
  return (
    <Link to ={{pathname:'/watch',movie:movie}}> <div
      className="listitem"
      style={{ left: isHovered && index * 225 - 58 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.image}
        alt=""
      />{isHovered ? <>
        <video src={movie?.trailer} autoPlay={true} loop/>
      <div className="listinfo">
        <div className="icons">
          <PlayArrow className="icon"/>
          <ThumbUpOutlined className="icon"/>
          <Add className="icon"/>
          <ThumbDownAltOutlined className="icon"/>
        </div>
        <div className="item__if">
            <span>{ movie?.duration}</span>
            <span className="limit">{ movie?.limit}</span>
            <span>{movie?.year }</span>
        </div>
        <div className="dec">
          {movie?.desc}
        </div>
          <div className="genre">{ movie?.genre}</div>
      </div>
      </>:"" }
    
    </div>
    </Link>
   
  );
}

export default Listitem;
