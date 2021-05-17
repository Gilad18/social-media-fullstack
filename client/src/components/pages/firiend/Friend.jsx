import React, { useState, useEffect } from 'react'
import './friend.css'
import FunctionS from '../../utilities/functios'
import axios from 'axios'
import { useParams, useHistory } from 'react-router'
import Post from '../feed/Post'
import { Button } from 'semantic-ui-react'

export default function Friend() {

    const token = localStorage.getItem('token')
    const userID = useParams()
    const history = useHistory()


    if(userID.id === userID.member) {
        history.push(`/user/${userID.id}/profile`)
    }
    const [friend, setFriend] = useState(null)
    const [post , setPost] = useState(null)

    useEffect(() => {
        const fetch = async () => {
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
        fetch()
    }, [token,userID])
    
    const search = async ()  => {
        const user = await axios({
            method: 'get',
            url: `https://social-media-gilad.herokuapp.com/social/api/friend/${userID.member}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setFriend(user.data)
        console.log(user.data)
    }
    
    const followuser = async (id) => {
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${id}/follow`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        search()
    }

    return (
        <div className="freindSec">
                 {friend!==null && <React.Fragment>
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
                    <div className="followersBOX">
                    <div className="ui blue left ribbon label" style={{margin:'2%'}}>
                        {`Some of ${friend.name.split(" ")[0]}'s followers:`}
                         
                        </div>
                    </div>
                    <div className="recentPost">
                    {
                         post !== null &&  <React.Fragment>
                             <div className="ui teal left ribbon label" style={{margin:'2%'}}>Recent Post:</div>
                             <Post post={post} />
                              </React.Fragment> 
                    }
                    </div>
                    </React.Fragment>}
                  </div>
    )
}
