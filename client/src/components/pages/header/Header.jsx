import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import Notification from '../../utilities/Notification'
import './header.css'

export default function Header() {
    const id = useParams()
    const [popup , setPopUp] = useState(false)
    const [notification , setNotification] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const search = async () => {
            console.log('header getting notification')
           const getNotes = await axios({
               method : 'get',
               url : 'https://social-media-gilad.herokuapp.com/social/api/getnotes',   
               headers : {
                'Authorization':`Bearer ${token}`
            }
           })
           setNotification(getNotes.data)
        }
        search()
    },[token ])

    const handlePop = async ()  => {
        setPopUp(!popup)
            await axios({
            method:'put',
            url : 'https://social-media-gilad.herokuapp.com/social/api/clearNotification',
            headers : {
                'Authorization':`Bearer ${token}`
            }
        })
    }

    return (
        <div className="headerPage">
            <Link to={`/user/${id.id}/profile`}><Icon size='big'  name='user'/></Link>
            <Link to={`/user/${id.id}/feed`}><Icon size='big' name='newspaper'/></Link>
            <Link to={`/user/${id.id}/friend/`}><Icon size='big' name='users'/></Link>
            <i className='big  search icon'></i>
            <i className={`big  alarm icon ${ notification.length > 0  ?'red' : 'black'}`} onClick={handlePop}></i>
            {popup && <Notification notes={notification}/> }
        </div>
    )
}


