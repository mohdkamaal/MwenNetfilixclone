import React, { useEffect, useState } from 'react'
import './Home.scss'
import {AcUnit} from '@material-ui/icons'
import Header from '../../Componenets/Header/Header'
import List from '../../Componenets/List/List'
import Featured from '../../Componenets/featured/Featured'
import axios from 'axios'
function Home({ type }) {
    const [list, setlist] = useState([])
    const [genre, setgenre] = useState(null)
 useEffect(() => {
     const getRandomList = async () => {
         try {
             const res = await axios.get(`list${type ? "?type=" + type : ""}${genre? "&genre="+genre:''}`, {
                  headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
             })
             setlist(res.data)
         } catch (error) {
             console.log(error)
         }
     }
     getRandomList()
 }, [type,genre])

    return (
        <div className="home">
            <Header />
            <Featured type={type} setgenre={setgenre} />
            {
                list.map((l) => (
                    <List li={l}/>
                ))
            }
           
            
        </div>
    )
}

export default Home
















