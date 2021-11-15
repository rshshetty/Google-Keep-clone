import React from 'react'
import "../../style.css"
import { useDispatch } from 'react-redux';
import { set_mode } from '../ContextApi/eventActions';
const DarkMode = ({mode}) => {

let dispatch = useDispatch()
  const setmode=(mode==='light'?'dark':'light')
  
    return (
        <div className="navbar1">
        <div className="toggle" style={{textAlign:"center"}}> 
             <label className="switch">
            <input type="checkbox" onChange={()=>dispatch(set_mode(setmode))}/>
        <span className="slider"></span>
      </label>
        </div>
        </div>
    )
}

export default DarkMode
