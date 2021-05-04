import React from 'react'
import { useParams } from 'react-router'
import {Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import './header.css'

export default function Header() {
    const id = useParams()

    return (
        <div className="header">
            <Link to={`/user/${id.id}/profile`}><Icon size='huge' color='grey' name='user'/></Link>
            <Link to={`/user/${id.id}/feed`}><Icon size='huge'color='grey' name='newspaper'/></Link>
            <Link to={`/user/${id.id}/explore`}><Icon size='huge'color='grey' name='feed'/></Link>
        </div>
    )
}


