import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import MayKnow from '../../utilities/MayKnow'
import Sponser from '../../utilities/Sponsered'
import { Button } from 'semantic-ui-react'
import './feed.css'

export default function Feed() {

    const token = localStorage.getItem('token')

    const [postsA , setPostA] = useState([])
    const [postsB , setPostB] = useState([])

    useEffect(() => {
        const search = async () => {
            const allPost = await axios({
                method : 'get',
                url :`https://social-media-gilad.herokuapp.com/social/api/posts/relevant`,
                headers : {
                    'Authorization':`Bearer ${token}`}
               })
            const posts = allPost.data
            const theSplitIndex = Math.ceil(posts.length/2)
            setPostA(posts.slice(0,theSplitIndex))
            console.log(postsA)
            setPostB(posts.slice(theSplitIndex,posts.length))
        }
        search()
    }, [])

    return (
        <div className="feedPage">
            {postsA.map((item,index)=> {
              return  <Post post={item} key={index}/>
            })}
            <Sponser/>
            {postsB.map((item,index)=> {
              return  <Post post={item} key={index}/>
            })}
            <MayKnow/>
            <Sponser/>
            <Button primary>Load More</Button>
        </div>
    )
}
