import React, { useState, useEffect } from 'react'
import './friend.css'
import FunctionS from '../../utilities/functios'
import axios from 'axios'
import { useParams } from 'react-router'
// import Sponser from '../../utilities/Sponsered'
// import Post from '../feed/Post'
import { Button } from 'semantic-ui-react'

export default function Friend() {

    const token = localStorage.getItem('token')
    const userID = useParams()
    const [friend, setFriend] = useState(null)

    useEffect(() => {
        console.log(  userID.id)
        console.log(token)

        // const search = async () => {
        //      user = await axios.get('http://localhost:4500/social/api/friend' ,
        //      {friend : userID.id} ,
        //      { headers: { Authorization: `Bearer ${token}` }})
        //      console.log(user.data)
        // }
        const search = async () => {
            const user = await axios({
                method: 'get',
                url: `https://social-media-gilad.herokuapp.com/social/api/friend/${userID.id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(user)
            setFriend(null)
        }
        search()
    }, [])

    return (
        <div className="freindSec">
            {
                friend==!null &&
                <React.Fragment>
                    <div className="profileBio">
                        <div className="profileBioImage">
                            {friend.avatar ?
                                <img className="profilePic" alt={`${friend.name}`}
                                    src={`data:image/jpg;base64,${FunctionS(friend.avatar.data)}`} />
                                :
                                <img className="profilePic" alt="Empty"
                                    src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                            }
                        </div>
                        <div className="profileBioInfo">
                            <h3>{friend}</h3>
                            <h5>Followed by {friend.followers.length} people</h5>
                            <h6>Joined 05/05/2020</h6>
                        </div>
                    </div>
                    <Button primary>Follow</Button>
                    <h4>Recent Post :</h4>
                    {/* <Post/> */}
                </React.Fragment>
            }
                 HELLO
        </div>
    )
}
