import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import Post from './Post'
import './feed.css'

export default function Feed() {

    const [posts , setPost] = useState([])

    useEffect(() => {
        const search = async () => {
            console.log('hey')
            const allPost = await axios.get(`https://social-media-gilad.herokuapp.com/social/api/posts`)
            // console.log(allPost.data)
            setPost(allPost.data)
        }
        search()
    }, [])

    return (
        <div className="feedPage">
            {posts.map((item,index)=> {
              return  <Post post={item} key={index}/>
            })}
        </div>
    )
}
