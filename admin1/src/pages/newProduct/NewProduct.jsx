
import { useContext, useState } from "react";
import { CreateMovie } from "../../context/Moviecontext/apiCalls";
import { MoviesContext } from "../../context/Moviecontext/MoviesContext";
import storage from "../../firebase/firebase";
import "./newProduct.css";
export default function NewProduct() {
  const { dispatch} = useContext(MoviesContext)
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(1);
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  console.log(movie)
  const handleSelect = (e) => {
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateMovie(dispatch,movie)
  };

  const Upload = (items) => {
    
    items.forEach(item => {
      const filename =  new Date().getTime()+item.label+item.file.name
      const uploadTask = storage.ref(`/items/${filename}`).put(item.file)
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
        file:img,label:"image"
      },
      {
        file:imgTitle,label:"imageTitle"
      },
      {
        file:trailer,label:"trailer"
      },
      {
        file:video,label:"video"
      },
    ])

  }
  console.log(movie)
  console.log(uploaded)
  return (
     <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imageTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name=" imagesm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded >=5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
