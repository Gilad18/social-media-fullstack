import React, { useState , useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import './utilities.css'

export default function MayKnow() {

    const token = localStorage.getItem('token')
    const [people, setPeople] = useState([])


    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

       useEffect(() => {
        const search = async () => {
            const users = await axios({
                method: 'get',
                url: `https://social-media-gilad.herokuapp.com/social/api/mayknow`,      //change to heroku after git push
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPeople(users.data)
           }
           search()
       }, [])            

       

    const followuser = async (id) => {
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${id}/follow`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return (
        <div className="peopleYouMayKnowSec">
            <div className="ui teal left ribbon label">PeopleYou May Know</div>
            <button style={{ float: 'right', backgroundColor: 'transparent', border: 'none' }}>
                <Icon size='large' color='olive' name='refresh' /></button>
            <div className="peopleYouMayKnow">
                {people.map((item, index) => {
                    return <div key={index} className="ui card" style={{ maxWidth: '35%', padding: '1%', margin: '0' }}>
                        <div className="image">
                            {item.avatar ?
                                <img style={{ height: '12vh' }} alt={`${item.name}`}
                                    src={`data:image/jpg;base64,${arrayBufferToBase64(item.avatar.data)}`} />
                                :
                                <img style={{ height: '12vh' }} alt="Empty"
                                    src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                            }</div>
                        <div className="content">
                            <div className="header" style={{ fontSize: '14px' }}>{item.name.split(" ")[0]}</div>
                            <div className="extra content" style={{ marginBottom: '10%' }}><i aria-hidden="true" className="user icon"></i>{item.followers.length}</div>
                            <Button onClick={() => followuser(item._id)} secondary>Follow</Button>
                        </div>
                    </div>
                })}
            </div>
        </div>


    )
}
