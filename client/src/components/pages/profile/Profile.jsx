import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import FunctionS from '../../utilities/functios'
import './profile.css'
import { Button, Form} from 'semantic-ui-react'
import MayKnow from '../../utilities/MayKnow'
import Post from '../feed/Post'
import Text from '../../utilities/texts'


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
    const [post , setPost] = useState(null)
    
    useEffect(() => {
        search();
        getPost();
    }, [token , userID])

    const search = async () => {
        const theUser = await axios({
            method : 'get',
            url : `https://social-media-gilad.herokuapp.com/social/api/profile/${userID.id}`,
            headers : {
                'Authorization':`Bearer ${token}`
            }
        })
        setUser(theUser.data)
        const followers = theUser.data.followers
        let followersID = []
        followers.forEach((it)=>followersID.push(it._id))
        localStorage.setItem('followers', followersID)
    }

    const getPost = async () => {
        const relevatnt = await axios({
            method : 'get',
            url :`https://social-media-gilad.herokuapp.com/social/api/recent/${userID.id}`,
            headers : {
                'Authorization':`Bearer ${token}`
            }
        })
        console.log(relevatnt.data)
        setPost(relevatnt.data)
    }

    const uploadImage = async () => {
        setLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append('avatar', newImage);
        try {
            const newProfilePic = await axios({
                method: 'post',
                url: `https://social-media-gilad.herokuapp.com/social/api/${userID.id}/uploadpic`,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" }
            })
            setImageSec(false)
            setMessageIMG(newProfilePic.data.succes)   //change in server for all messages paths
            setLoading(false)
            search();
            setTimeout(() => {
                setMessageIMG('')
            }, 2000);
        }
        catch(err) {
            setImageSec(false)
            setMessageIMG('Image Upload failed, try agian')   //change in server for all messages paths
            setLoading(false)
        }
    }

    const createNewPost = async () => {
        let bodyFormData = new FormData();
            bodyFormData.append('content', postText);
            
        if (postMedia!==null) {
            bodyFormData.append('image', postMedia);
        }
           console.log(bodyFormData)
        try {
              const newPostR =  await axios({
                method: 'post',
                url: 'https://social-media-gilad.herokuapp.com/social/api/profile/newpost',
                data: bodyFormData,
                headers : {
                    'Authorization':`Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            setMessageIMG(newPostR.data.success)
            setTimeout(() => {
                history.push(`/user/${userID.id}/feed`)
            }, 1500);
        }
        catch (error) {
            console.log(error.response)
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
                            src={`data:image/jpg;base64,${FunctionS(user.avatar.data)}`} />
                        :
                        <img className="profilePic" alt="Empty"
                            src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                    }
                    <i className="black circular small camera icon" onClick={handleLoadImageSec}></i>
                    {
                        uploadImageSec &&

                        <div className="uploadImage">
                            <Form.Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                            <button className={`ui basic blue button  ${ loading ?'loading' : ''} `} 
                            onClick={uploadImage}>Upload</button>
                        </div>
                    }
    
                </div>
              
                <div className="profileBioInfo">
                    <h3>{user.name}</h3>
                    {user.followers && <h5>Followed by {user.followers.length} people</h5>}
                </div>
            </div>
            <p style={{ textAlign: 'center', color:'#f4a261', fontWeight: 'bold', fontSize: '14px' }}>{imageUploadMess}</p>
            <div className="profileNewPost">
                <textarea placeholder={Text[Math.floor(Math.random()*4)]} onChange={(e) => setPostText(e.target.value)} />
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
            {
                post!==null &&  <div className="profileRecentPOst">
                            <div className="ui blue left ribbon label" style={{margin:'1%'}}>Recent Post:</div>
                            <Post post={post}/>
                </div > 
            }
        </div>
    )
}


// src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
