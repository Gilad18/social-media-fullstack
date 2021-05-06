import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import './profile.css'
import { Button, Form} from 'semantic-ui-react'

export default function Profile() {

    const history = useHistory();
    const userID = useParams()
    const [user, setUser] = useState({})
    const [postText, setPostText] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [uploadImageSec, setImageSec] = useState(false)
    const [imageUploadMess, setMessageIMG] = useState('')

    useEffect(() => {
        const search = async () => {
            const theUser = await axios.get(`https://social-media-gilad.herokuapp.com/profile/${userID.id}`)
            console.log(theUser.data)
            setUser(theUser.data)
        }
        search()
    }, [])

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const uploadImage = async () => {
        let bodyFormData = new FormData();
        bodyFormData.append('avatar', newImage);
        const newProfilePic = await axios({
            method: 'post',
            url: `https://social-media-gilad.herokuapp.com/social/api/${userID.id}/uploadpic`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        setImageSec(false)
        setMessageIMG(newProfilePic.data.succes)   //change in server for all messages paths
        console.log(newProfilePic)
        setTimeout(() => {
            setMessageIMG('')
        }, 2000);
    }

    const createNewPost = async () => {
        try {
            const newPost = await axios({
                method: 'post',
                url: 'https://social-media-gilad.herokuapp.com/social/api/profile/newpost',
                data: {
                    content: postText
                }
            })
            setTimeout(() => {
                history.push(`/user/${userID.id}/feed`)
            }, 1000);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleLoadImageSec = () => {
        setImageSec(!uploadImageSec)
    }

    return (
        <div className="profileSec">
            <div className="profileBio">
                <div className="profileBioImage">
                    {user.avatar ?
                        <img className="profilePic" alt={`${user.name}'s profile picture`}
                            src={`data:image/jpg;base64,${arrayBufferToBase64(user.avatar.data)}`} />
                        :
                        <img className="profilePic" alt="Empty User Pic"
                            src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                    }
                    {/* <Icon name="camera" color="black"/> */}
                    <i className="black circular small camera icon" onClick={handleLoadImageSec}></i>
                    {
                        uploadImageSec &&

                        <div className="uploadImage">
                            <Form.Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                            <Button onClick={uploadImage} content='Upload' primary />
                        </div>
                    }
                    <p style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '18px' }}>{imageUploadMess}</p>
                </div>
                <div className="profileBioInfo">
                    <h3>{user.name}</h3>
                    {user.followers && <h5>Followed by {user.followers.length} people</h5>}
                </div>
            </div>
            <div className="profileNewPost">
                <textarea placeholder="What's on your mind honey? Spill it out..." onChange={(e) => setPostText(e.target.value)} />
                <Button onClick={createNewPost} content='Share Post' primary />
            </div>
            <div className="meta" style={{textAlign:'center' , color:'white'}}>People You May Know</div>
            <div className="peopleYouMayKnow">
               
                <div className="ui card" style={{maxWidth:'35%' , padding:'1%' ,margin:'0'}}>
                <div className="image"><img src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'/></div>
                 <div className="content">
                 <div className="header" style={{fontSize:'14px'}}>Matthew</div> 
                 <div className="extra content" style={{marginBottom:'10%'}}><a><i aria-hidden="true" className="user icon"></i>22</a></div>
                 <Button secondary>Follow</Button>
                 </div>
                </div>
              
                <div className="ui card" style={{maxWidth:'35%' , padding:'1%',margin:'0'}}>
                <div className="image"><img src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'/></div>
                 <div className="content">
                 <div className="header" style={{fontSize:'14px'}}>Matthew</div> 
                 <div className="extra content" style={{marginBottom:'10%'}}><a><i aria-hidden="true" className="user icon"></i>22</a></div>
                 <Button secondary>Follow</Button>
                 </div>
                </div>
            </div>
        </div>
    )
}


// src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
