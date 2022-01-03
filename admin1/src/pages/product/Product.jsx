import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import MoivesReducer from "../../context/Moviecontext/MoviesReducer";
import { useContext, useState } from "react";
import storage from "../../firebase/firebase";
import { MoviesContext } from "../../context/Moviecontext/MoviesContext";
import { updateMovie } from "../../context/Moviecontext/apiCalls";

export default function Product() {
    const location = useLocation()
      const { dispatch} = useContext(MoviesContext)
    const [movies, setMovie] = useState(null);
    const [uploaded, setUploaded] = useState(1);
      const [trailer, setTrailer] = useState(null);
      const [img, setimg] = useState(null);
    
  const [video, setVideo] = useState(null);
    const movie = location.movie
      const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movies, [e.target.name]: value });
      };
    console.log(movies)

console.log(img)
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(dispatch,movies,movie._id)
  };
     const Upload = (items) => {
    
    items.forEach(item => {
      const filename =  new Date().getTime()+item?.label+item?.file.name
      const uploadTask = storage.ref(`/items/${filename}`).put(item?.file)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("uploading is "+progress+"% done")
      }
        , (err) => console.log(err), () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url)=> {
            console.log(url)
            setMovie((pre) => {
            return {...pre,[item.label]:url}
            })
            setUploaded((pre)=>pre+1)
        })
      }
      
      )
    })
  }
  const handleUpload = (e) => {
    e.preventDefault();

    Upload([
      {
        file:trailer,label:"trailer"
      },
      {
        file:video,label:"video"
      },
      {
        file:img,label:"image"
      },
    ])

  }
    console.log(video)
    console.log(trailer)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={movie.image} className="productInfoImg" />
                      <span className="productName">{ movie.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{ movie._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre</span>
                          <span className="productInfoValue">{ movie.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Year</span>
                          <span className="productInfoValue">{ movie.year}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">limit</span>
                          <span className="productInfoValue">{movie.limit }</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Moive title</label>
                      <input type="text"  name="title"  onChange={handleChange} placeholder={ movie.title}/>
                  <label>Year</label>
                      <input type="text"   name="year"  onChange={handleChange} placeholder={ movie.year}/>
                  <label>Genre</label>
                      <input type="text"  name="genre" onChange={handleChange} placeholder={ movie.genre}/>
                  <label>Limit</label>
                      <input type="text"   name="limit"  onChange={handleChange} placeholder={ movie.limit}/>
                  <label>Trailer</label>
                      <input type="file" onChange={e=>setTrailer(e.target.files[0])} name="trailer"  placeholder={ movie.trailer}/>
                  <label>Video</label>
                      <input type="file"  onChange={e=> setVideo(e.target.files[0])}  name="video" placeholder={ movie.video}/>
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                          <img src={movie.image}alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" name="image" onChange={e=>setimg(e.target.files[0])}  style={{display:"none"} } />
                  </div>
                        {uploaded >=4 ? (
          <button className="addProductButton" onClick={handleSubmit}>
          update
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
              </div>
          </form>
      </div>
    </div>
  );
}
