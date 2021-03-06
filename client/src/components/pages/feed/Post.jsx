import axios from 'axios'
import React, { useState,useRef } from 'react'
import { Header, Image, Comment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import FunctioS from '../../utilities/functios'
import './feed.css'

export default function Post({ post }) {

    const token = localStorage.getItem('token')
    const userID = localStorage.getItem('id')
    const [aPost, setPost] = useState(post)
    const [newCommentext, setNewCommentex] = useState('')
    const [moreComments, setMoreComments] = useState(false)
    const [loading , setLoading] = useState(false)
    const [likes , setLikes] = useState(post.likes.length)
    const likeBtn = useRef()


    const timePassed = (date) => {
        const now = new Date()
        const then = new Date(date)
        let dayNow = now.getDate()
        let thenDay = then.getDate()
        let milis = 1000 * 60
        let diffrance = (now - then) / milis
        if (diffrance < 60) {
            if (diffrance < 5) {
                return 'Just now!'
            } else {
                return diffrance.toFixed(0) + ' mins ago'
            }
        }
        if (diffrance >= 60 && diffrance < 720) {
            if (diffrance < 120) {
                return '1 hour ago'
            } else {
                let hours = diffrance / 60
                return hours.toFixed(0) + ' hours ago'
            }
        }
        if (diffrance >= 720 && diffrance < 1440) {
            let tens = ''
            if (then.getMinutes() < 10) {
                tens = '0'
            }
            if (dayNow !== thenDay) {
                return `Yesterday ${then.getHours()}:${tens}${then.getMinutes()}`
            } else {
                return `Today ${then.getHours()}:${tens}${then.getMinutes()}`
            }
        }
        if (diffrance >= 1440 && now.getMonth() === then.getMonth()) {
            return `${dayNow - thenDay} days ago`
        }
        return `${then.getDate()}-${then.getMonth() + 1}-${then.getFullYear()}`
    }

    const search = async () => {
        const updatePost = await axios({
            method: 'get',
            url: `https://social-media-gilad.herokuapp.com/social/api/post/${post._id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setPost(updatePost.data)
        setLikes(updatePost.data.likes.length)
    }

    const likePost = async () => {
        if (likeBtn.current.className.includes('teal')) {
            setLikes(likes-1)
            likeBtn.current.className = 'ui button'
        } else {
             setLikes(likes+1)
             likeBtn.current.className = 'ui button teal'
            }
        
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${post._id}/like`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        search()
    }

    const comment = async () => {
        setLoading(true)
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${post._id}/comment`,
            data: {
                content: newCommentext
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        search()
        setNewCommentex('')
        setLoading(false)
    }

    const handleMoreComments = () => {
        setMoreComments(!moreComments)
    }

    return (
        <div className="singlePost">
            <Header as='h4'>
                {
                    aPost.author.avatar!==null ?
                        <img className="ui big circular image" src={`data:image/jpg;base64,${FunctioS(aPost.author.avatar.data)}`}
                            style={{ maxHeight: '3rem' }} alt="pic" />
                        :
                        <Image circular size='big' alt="pic" src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                }
                <Header.Content>
                    <Link to={`/user/${userID}/friend/${aPost.author._id}`}>{aPost.author.name}</Link>
                    <Header.Subheader>{timePassed(aPost.date)}</Header.Subheader>
                </Header.Content>
            </Header>
            <div className="singlePostContent">
                {post.content}
            </div>
            {aPost.image &&
                <div className="postImage" >
                    <img style={{ width: '100%', height: '100%' }} alt="pic"
                        src={`data:image/jpg;base64,${FunctioS(aPost.image.data)}`} />
                </div>
            }
            <div className="likeAndShareSec">
            <div className="ui labeled button">
                <button ref={likeBtn} className={`ui button ${aPost.likes.some((it) => it._id === userID) ? 'teal' : ''}`} onClick={likePost}>
                    <i aria-hidden="true" className={`heart icon`}></i> </button>
                <div className="ui teal left pointing basic label">{likes}</div>
            </div>
            </div>
            <div className="writeComment">
                <textarea value={newCommentext} onChange={(e) => setNewCommentex(e.target.value)} placeholder="write a comment..." />
                <button onClick={comment}><i className={`comment icon ${loading? 'loading' : ''}`}></i></button>
            </div>
            {aPost.comments.length > 0 &&
                <div className="ui comments" style={!moreComments ? { overflow: 'hidden' } : { overflow: 'visible' }}>
                    <h4 className="ui dividing header" onClick={handleMoreComments}>
                        {aPost.comments.length} Comments {aPost.comments.length > 1 &&  <i aria-hidden="true" className="small chevron down icon"></i>}
                        </h4>
                    {aPost.comments.map((item, index) => {
                        return <Comment key={index}>
                            {
                                item.commenter.avatar ?
                                    <Comment.Avatar  src={`data:image/jpg;base64,${FunctioS(item.commenter.avatar.data)}`} />
                                    :
                                    <Comment.Avatar src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />

                            }
                            <Comment.Author as='a'>
                                <Link to={`/user/${userID}/friend/${item.commenter._id}`}>{item.commenter.name}</Link>
                            </Comment.Author>
                            <Comment.Metadata><div>{timePassed(item.onDate)}</div> </Comment.Metadata>
                            <Comment.Text>{item.content}</Comment.Text>
                        </Comment>
                    })}
                </div>
            }
        </div>
    )
}
