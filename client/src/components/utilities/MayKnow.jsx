import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import './utilities.css'

export default function MayKnow() {

    const token = localStorage.getItem('token')
    const [people, setPeople] = useState([])
    // const [loading , setLoading] = useState(false)
    const [finished , setFinish] = useState(false)


    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const search = async () => {
        const users = await axios({
            method: 'get',
            url: `https://social-media-gilad.herokuapp.com/social/api/mayknow`,      //change to heroku after git push
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setPeople(users.data)
        if(users.data.length<1) {
            setFinish(true)
        }
       }

    useEffect(() => {
        search()
    }, [token])



    const followuser = async (id) => {
        // setLoading(true)
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${id}/follow`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        search()
        // setLoading(false)
    }

    return (
        <div className="peopleYouMayKnowSec" style={finished ? {display:'none'}: {display : 'block'}} >
            <div className="ui teal left ribbon label">PeopleYou May Know</div>
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
                            <button  onClick={() => followuser(item._id)}
                             className={`ui primary button`}>Follow</button>
                        </div>
                    </div>
                })}
            </div>
        </div>


    )
}
