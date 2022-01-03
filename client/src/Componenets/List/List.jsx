import { ListItemAvatar } from '@material-ui/core'
import { ArrowBackOutlined, ArrowForward } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import Listitem from '../Listitem/Listitem'
import './List.scss'
function List({ li }) {
    // console.log(li)
    const [slideNumber, setslideNumber] = useState(0)
    const [ismoved, setismoved] = useState(false)
    const  listRaf = useRef()
    const handleClick = (direction) => {
        let distance = listRaf.current.getBoundingClientRect().x - 50
     
        if (direction === 'left' && slideNumber > 0) {
            listRaf.current.style.transform = `translateX(${230 + distance}px)`
            setslideNumber(slideNumber-1)
        }
        else if (slideNumber < 5) {
            setslideNumber(slideNumber + 1)
            setismoved(true)
             listRaf.current.style.transform=`translateX(${-230+distance}px)`
        }
        console.log(distance)
    }
    return (
        <div className="list">
            <span className="list__title">
                {li.title}
            </span>
            <div className="list__wrapper">
                <ArrowBackOutlined className={ismoved ? `list__slider left` : `none`} onClick={() => handleClick('left')} />
                

                <div className="list__container" ref={listRaf}>

                    {
                        li.content.map((list , i) => (
                            <Listitem index={i}
                                item={list}/>
                        ))
                }
                    
                    
                
                 
                </div>
                <ArrowForward className="list__slider right" onClick={()=>handleClick('right')}/>
            </div>
        </div>
    )
}

export default List
