import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Icon, Modal, Button } from 'semantic-ui-react'
import Notification from '../../utilities/Notification'
import './header.css'

export default function Header() {
    const id = useParams()
    const history = useHistory()
    const [popup, setPopUp] = useState(false)
    const [notification, setNotification] = useState([])
    const [open, setOpen] = useState(false)
    const [seeYou , setSeeYou] = useState(false) 

    const token = localStorage.getItem('token')

    const search = async () => {
        console.log('header getting notification')
        const getNotes = await axios({
            method: 'get',
            url: 'https://social-media-gilad.herokuapp.com/social/api/getnotes',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setNotification(getNotes.data)
    }

    useEffect(() => {
        search()
    }, [token])


    const handlePop = async () => {
        if (popup) {
            setPopUp(false)
            await axios({
                method: 'put',
                url: 'https://social-media-gilad.herokuapp.com/social/api/clearNotification',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            search()
        }
        setPopUp(!popup)
    }

    const handleLogout = async () => {
        await axios({
            method: 'put',
            url: 'https://social-media-gilad.herokuapp.com/social/api/profile/logout',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setSeeYou(true)
        setTimeout(() => {
            history.push('/')
        }, 1500);

    }


    return (
        <div className="headerPage">
            <Link to={`/user/${id.id}/profile`}><Icon size='big' name='user' /></Link>
            <Link to={`/user/${id.id}/feed`}><Icon size='big' name='newspaper' /></Link>
            <Link to={`/user/${id.id}/friend/`}><Icon size='big' name='users' /></Link>
            {/* <i className='big  log out icon' onClick={handlePop}></i> */}
            <i className={`big  alarm icon ${notification.length > 0 ? 'red' : 'black'}`} onClick={handlePop}></i>
            {popup && <Notification notes={notification} />}

            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                // centered={false}
                trigger={<i className='big  log out icon'></i>}
            >
                <Modal.Content>
                    <h3>Are you sure you want to leave?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                  </Button>
                    <Button color='green' inverted onClick={handleLogout}>
                        <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
                {
                    seeYou && <Modal.Content>
                        <h3>Can't wait to see you soon :)</h3>
                    </Modal.Content>
                }

            </Modal>




        </div>


    )
}


