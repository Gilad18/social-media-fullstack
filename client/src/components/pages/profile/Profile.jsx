import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import './profile.css'
import { Button, Form} from 'semantic-ui-react'
import MayKnow from '../../utilities/MayKnow'

export default function Profile() {

    const token = localStorage.getItem('token')

    const history = useHistory();
    const userID = useParams()
    const [user, setUser] = useState({})
    const [postText, setPostText] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [uploadImageSec, setImageSec] = useState(false)
    const [postMediaVisible, setpostMediaVisible] = useState(false)
    const [postMedia , setPostMedia] = useState(null)
    const [imageUploadMess, setMessageIMG] = useState('')
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        const search = async () => {
            const theUser = await axios({
                method : 'get',
                url : `https://social-media-gilad.herokuapp.com/social/api/profile/${userID.id}`,
                headers : {
                    'Authorization':`Bearer ${token}`
                }
            })
            setUser(theUser.data)
        }
        search()
    }, [token , userID])

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const uploadImage = async () => {
        setLoading(true)
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
        setLoading(false)
        setTimeout(() => {
            setMessageIMG('')
        }, 2000);
    }

    const createNewPost = async () => {
        try {
                await axios({
                method: 'post',
                url: 'https://social-media-gilad.herokuapp.com/social/api/profile/newpost',
                data: {
                    content: postText
                },
                headers : {
                    'Authorization':`Bearer ${token}`
                }
            })
            setTimeout(() => {
                history.push(`/user/${userID.id}/feed`)
            }, 1500);
        }
        catch (err) {
            console.log(err)
        }
    }

    const addImageToPost = async () => {
        setpostMediaVisible(!postMediaVisible)
    }

    const handleLoadImageSec = () => {
        setImageSec(!uploadImageSec)
    }

    return (
        <div className="profileSec">
            <div className="profileBio">
                <div className="profileBioImage">
                    {user.avatar ?
                        <img className="profilePic" alt={`${user.name}`}
                            src={`data:image/jpg;base64,${arrayBufferToBase64(user.avatar.data)}`} />
                        :
                        <img className="profilePic" alt="Empty"
                            src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                    }
                    <i className="black circular small camera icon" onClick={handleLoadImageSec}></i>
                    {
                        uploadImageSec &&

                        <div className="uploadImage">
                            <Form.Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                            <button className={`ui basic button  ${ loading ?'loading' : ''} `} 
                            onClick={uploadImage}>Upload</button>
                        </div>
                    }
    
                </div>
              
                <div className="profileBioInfo">
                    <h3>{user.name}</h3>
                    {user.followers && <h5>Followed by {user.followers.length} people</h5>}
                    {/* <h4>From Tel Aviv</h4> */}
                </div>
            </div>
            <p style={{ textAlign: 'center', color:'#f4a261', fontWeight: 'bold', fontSize: '14px' }}>{imageUploadMess}</p>
            <div className="profileNewPost">
                <textarea placeholder="What's on your mind honey? Spill it out..." onChange={(e) => setPostText(e.target.value)} />
                <div className="newPostButtons">
                <Button onClick={addImageToPost} content='Add Image' secondary />
                <Button onClick={createNewPost} content='Share Post' primary />
                </div>
                {
                        postMediaVisible &&

                        <div className="uploadImage">
                            <Form.Input type="file" onChange={(e) => setPostMedia(e.target.files[0])} />
                            {/* <button className={`ui basic button  ${ loading ?'loading' : ''} `} 
                            onClick={uploadImage}>Upload</button> */}
                        </div>
                    }
            </div>
            <MayKnow/>
        </div>
    )
}


// src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
