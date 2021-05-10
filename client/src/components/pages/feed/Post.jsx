import axios from 'axios'
import React, { useState } from 'react'
import { Button, Header, Image, Comment, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './feed.css'

export default function Post({ post }) {

    const token = localStorage.getItem('token')
    const userID = localStorage.getItem('id')
    const [aPost, setPost] = useState(post)
    const [newCommentext, setNewCommentex] = useState('')
    const [moreComments, setMoreComments] = useState(false)

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
    const likePost = async () => {
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${aPost._id}/like`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    const comment = async () => {
        await axios({
            method: 'put',
            url: `https://social-media-gilad.herokuapp.com/social/api/${aPost._id}/comment`,
            data: {
                content: newCommentext
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    const handleMoreComments = () => {
        setMoreComments(!moreComments)
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    return (
        <div className="singlePost">
            <Header as='h4'>
                {
                    post.author.avatar ?
                        <img className="ui big circular image" src={`data:image/jpg;base64,${arrayBufferToBase64(post.author.avatar.data)}`}
                            style={{ maxHeight: '3rem' }} alt="pic" />
                        :
                        <Image circular size='big' alt="pic" src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                }
                <Header.Content>
                    <Link to={`/user/${userID}/friend/${post.author._id}`}>{post.author.name}</Link>
                    <Header.Subheader>{timePassed(post.date)}</Header.Subheader>
                </Header.Content>
            </Header>
            <div className="singlePostContent">
                {post.content}
            </div>
            {post.image &&
                <div className="postImage" >
                    <img style={{ width: '100%', height: '100%' }} alt="pic"
                        src={`data:image/jpg;base64,${arrayBufferToBase64(post.image.data)}`} />
                </div>
            }
            <Button as='div' color='blue' icon="heart" onClick={likePost}
                label={{ as: 'a', color: 'blue', pointing: 'left', content: `${post.likes.length}` }} />
            <div className="writeComment">
                <div className="ui comments">
                    <div className="comment" style={{margin : 'auto'}}>
                        {/* <div className="avatar ">
                            <Image circular size='big' alt="pic" src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                        </div> */}
                        <textarea onChange={(e) => setNewCommentex(e.target.value)} placeholder="write comment..." />
                        <button onClick={comment}><Icon name='comment' /></button>
                    </div>
                </div>
            </div>
            {post.comments.length > 0 &&
                <div className="ui comments" style={!moreComments ? { overflow: 'hidden' } : { overflow: 'visible' }}>
                    <h4 className="ui dividing header" onClick={handleMoreComments}>
                        {post.comments.length} Comments</h4>
                    {post.comments.map((item, index) => {
                        return <Comment key={index}>
                            <Comment.Avatar src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                            <Comment.Author as='a'>{item.commenter.name}</Comment.Author>
                            <Comment.Metadata><div>{timePassed(item.onDate)}</div> </Comment.Metadata>
                            <Comment.Text>{item.content}</Comment.Text>
                        </Comment>
                    })}
                </div>
            }
        </div>
    )
}
