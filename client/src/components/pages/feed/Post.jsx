import React from 'react'
import { Button, Header, Image, Comment } from 'semantic-ui-react'
import './feed.css'

export default function Post({ post }) {

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
    return (
        <div className="singlePost">
            <Header as='h4'>
                <Image circular src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                <Header.Content>
                    {post.authorID.name}
                    <Header.Subheader>{timePassed(post.date)}</Header.Subheader>
                </Header.Content>
            </Header>
            <div className="singlePostContent">
                {post.content}
            </div>
            {post.media &&
                <div className="postImage">

                </div>
            }
            <Button as='div' color='blue' icon="heart"
                label={{ as: 'a', color: 'blue', pointing: 'left', content: `${post.likes.length}` }} />
                <div className="writeComment">
                <div class="ui comments">
                    <div class="comment">
                        <div class="avatar"><img  src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'/></div>
                        <div class="content">
                            <textarea style={{height:'5vh', width:'80vw' , backgroundColor:'#A9A9A9' , border: 'none', color:'white'}} placeholder="Write comment..."/>
                            </div>
                            </div>
                            </div>
                </div>
            {post.comments.length > 0 &&
                <Comment.Group>
                    <Header as='h4' dividing>
                        {post.comments.length} Comments</Header>
                    {post.comments.map((item, index) => {
                        return <Comment key={index}>
                            <Comment.Avatar src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                            <Comment.Author as='a'>{item.commenter.name}</Comment.Author>
                            <Comment.Metadata><div>{timePassed(item.onDate)}</div> </Comment.Metadata>
                            <Comment.Text>{item.content}</Comment.Text>
                        </Comment>
                    })}
                </Comment.Group>
            }
        </div>
    )
}
