
import { Movie } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateLists } from "../../context/listContext/apiCalls";
import { ListsContext } from "../../context/listContext/listcontext";
import { CreateMovie, getMovie } from "../../context/Moviecontext/apiCalls";
import { MoviesContext } from "../../context/Moviecontext/MoviesContext";
import storage from "../../firebase/firebase";
import "./newlist.css";
export default function Newlist() {
 const [list, setlist] = useState(null)
  const { Lists,dispatch} = useContext(ListsContext)
  const { movies,dispatch: dispatchmovie} = useContext(MoviesContext)

const histroy  = useHistory()
useEffect(() => {
getMovie(dispatchmovie)
}, [dispatchmovie])
  const handleChange = (e) => {
const value =  e.target.value
  setlist({...list,[e.target.name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateLists(dispatch,list)
    histroy.push('/list')
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    
    setlist({ ...list, [e.target.name]: value })
  };
  
  console.log(list)
  return (
     <div className="newProduct">
      <h1 className="addProductTitle">New list</h1>
      <form className="addProductForm">
       
        
       
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
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select  name="content"   onChange={handleSelect}>
            <option >
            type
            </option>
            <option value="movie">
              Movie
            </option>
            <option value="series">
            Serises
            </option>
         </select>
        </div>
         <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" onChange={handleSelect} style={{height:"300px"}} >
            {
              movies.map((movie) => (
                <option key={movie._id} value={ movie._id}>
              {movie.title}
            </option>
               ))
          }
   
    
         </select>
        </div>
          <button className="addProductButton" onClick={handleSubmit}>
            update
          </button>
        
      </form>
    </div>
  );
}
