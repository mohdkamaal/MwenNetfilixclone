import { Link, useLocation } from "react-router-dom";
import "./Lists.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import MoivesReducer from "../../context/Moviecontext/MoviesReducer";
import { useContext, useState } from "react";
import storage from "../../firebase/firebase";
import { MoviesContext } from "../../context/Moviecontext/MoviesContext";
import { updateMovie } from "../../context/Moviecontext/apiCalls";

export default function List() {
    const location = useLocation()
      const { dispatch} = useContext(MoviesContext)
    const [movies, setMovie] = useState(null);
    const [uploaded, setUploaded] = useState(1);
      const [trailer, setTrailer] = useState(null);
      const [img, setimg] = useState(null);
    
  const [video, setVideo] = useState(null);
    const list = location.list
      const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movies, [e.target.name]: value });
      };
    console.log(movies)

console.log(img)
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateMovie(dispatch,movies,movie._id)
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
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                      <span className="productName">{ list.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{ list._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Genre</span>
                          <span className="productInfoValue">{list.genre}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">type</span>
                          <span className="productInfoValue">{ list.type}</span>
                  </div>
                
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>list title</label>
            <input type="text" name="title" onChange={handleChange} placeholder={list.title} />
                  <label>Year</label>
                      <input type="text"   name="type"  onChange={handleChange} placeholder={ list.type}/>
                  <label>Genre</label>
                      <input type="text"  name="genre" onChange={handleChange} placeholder={ list.genre}/>
 
      
                  
              </div>
              <div className="productFormRight">
                  
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
