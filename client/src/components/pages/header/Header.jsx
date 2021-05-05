import React, { useState } from 'react'
import { useParams } from 'react-router'
import {Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import Notification from '../../utilities/Notification'
import './header.css'

export default function Header() {
    const id = useParams()
    const [popup , setPopUp] = useState(false)
    const [notes , setNotes] = useState(true)      //should be true or false base on notification array length

    const handlePop = () => {
        setPopUp(!popup)
        setNotes(false)
    }

    return (
        <div className="headerPage">
            <Link to={`/user/${id.id}/profile`}><Icon size='big'  name='user'/></Link>
            <Link to={`/user/${id.id}/feed`}><Icon size='big' name='newspaper'/></Link>
            <Link to={`/user/${id.id}/explore`}><Icon size='big' name='feed'/></Link>
            <i className={`big  alarm icon ${ notes ?'red' : ''}`} onClick={handlePop}></i>
            
            { popup &&
            <React.Fragment>
                <Notification/>
                {/* <i className="big grey close icon" onClick={handlePop} style={{position:'absolute' , right:'0' , zIndex:'30'}}></i> */}
                </React.Fragment>
            }
        </div>
    )
}


