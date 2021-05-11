import React, { useState, useEffect } from 'react'
import './friend.css'
import FunctionS from '../../utilities/functios'
import axios from 'axios'
import { useParams } from 'react-router'
// import Sponser from '../../utilities/Sponsered'
import Post from '../feed/Post'
import { Button } from 'semantic-ui-react'

export default function Friend() {

    const token = localStorage.getItem('token')
    const userID = useParams()
    const [friend, setFriend] = useState(null)
    const [post , setPost] = useState(null)

    useEffect(() => {
        const search = async () => {
            const user = await axios({
                method: 'get',
                url: `https://social-media-gilad.herokuapp.com/social/api/friend/${userID.member}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setFriend(user.data)
            const post = await axios({
                method: 'get',
                url: `https://social-media-gilad.herokuapp.com/social/api/recent/${userID.member}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPost(post.data)
        }
        search()
    }, [token,userID])

    
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
        <div className="freindSec">
            {
                 friend !== null &&
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
                            <h3>{friend.name}</h3>
                            <h5>Followed by {friend.followers.length} people</h5>
                            <h6>Member since {friend.joined.split("T")[0]}</h6>
                        </div>
                    </div>
                    <Button onClick={()=>followuser(userID.member)} primary> {
                    friend.followers.some((it) => it._id === userID.id) ? 'Unfollow' : 'Follow'
                    }</Button>
                    <div className="recentPost">
                    <h4 style={{borderBottom:'1px solid black'}}>Recent Post :</h4>
                    {
                         post !== null &&   <Post post={post} />
                    }
                    </div>
                  
                </React.Fragment>
            }
        </div>
    )
}
