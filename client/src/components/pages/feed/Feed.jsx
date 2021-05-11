import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import MayKnow from '../../utilities/MayKnow'
import Sponser from '../../utilities/Sponsered'
import { Button } from 'semantic-ui-react'
import './feed.css'

export default function Feed() {

    const token = localStorage.getItem('token')

    const [postsA, setPostA] = useState([])
    const [postsB, setPostB] = useState([])
    const [postsC, setPostC] = useState([])
    const [postsD, setPostD] = useState([])

    useEffect(() => {
        const search = async () => {
            const allPost = await axios({
                method: 'get',
                url: `https://social-media-gilad.herokuapp.com/social/api/posts/relevant/0`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const posts = allPost.data
            const theSplitIndex = Math.ceil(posts.length / 2)
            setPostA(posts.slice(0, theSplitIndex))
            console.log(postsA)
            setPostB(posts.slice(theSplitIndex, posts.length))
        }
        search()
    },[token])

    const morePosts = async () => {
        const allPost = await axios({
            method: 'get',
            url: `https://social-media-gilad.herokuapp.com/social/api/posts/relevant/10`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const posts = allPost.data
        const theSplitIndex = Math.ceil(posts.length / 2)
        setPostC(posts.slice(0, theSplitIndex))
        console.log(postsA)
        setPostD(posts.slice(theSplitIndex, posts.length))
    }

    return (
        <div className="feedPage">
            {postsA.map((item, index) => {
                return <Post post={item} key={index} />
            })}
            <Sponser />
            {postsB.map((item, index) => {
                return <Post post={item} key={index} />
            })}
            <MayKnow />
            {
                postsB.length === 5 && <React.Fragment>
                    <Button onClick={morePosts} primary>Load More</Button>

                    {postsC.length > 0 ?

                        <React.Fragment>
                            {postsC.map((item, index) => {
                                return <Post post={item} key={index} />
                            })}
                            <Sponser />
                            {postsD.map((item, index) => {
                                return <Post post={item} key={index} />
                            })}

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <h4>No more posts from people you follow</h4>
                            <MayKnow/>
                        </React.Fragment>
                    }


                </React.Fragment>
            }

        </div>
    )
}
