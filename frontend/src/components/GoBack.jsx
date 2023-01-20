import React from 'react'
import { Link } from 'react-router-dom'
import abstract from "../styles/abstract.module.css";
import { ArrowBackIosNew } from "@mui/icons-material"
 
function GoBack({path,name}) {
  return (
    <button className={abstract.go_back_button_wrapper}>
        <Link to={path}>
            <ArrowBackIosNew/>
            <div>
                {name}
            </div>
        </Link>
    </button>
  )
}

export default GoBack