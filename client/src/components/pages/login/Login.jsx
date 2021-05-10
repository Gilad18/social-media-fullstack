import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './login.css'
import { Form } from 'semantic-ui-react';

export default function Login() {

    const history = useHistory();

    const [exist, setExist] = useState(false)
    // const [gender, setGender] = useState(null)
    const [toggleMessage, setToggleMessage] = useState(`Already have an account? login  `)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const createNewUser = async () => {
        setLoading(true)
        setMessage('')
        if (password === confirm) {
            try {
                const newUser = await axios({
                    method: 'post',
                    url: 'https://social-media-gilad.herokuapp.com/social/api/signin',
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                })
                setLoading(false)
                console.log(newUser)
                setMessage(newUser.data.success)
                localStorage.setItem('token', newUser.data.token)
                setTimeout(() => {
                    history.push(`/user/${newUser.data.newUser._id}/profile`)
                }, 1500);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        } else {
            setMessage('Passwords are not matched')
            setLoading(false)
        }
    }
    const login = async () => {
        setLoading(true)
        setMessage('')
        try {
            const user = await axios({
                method: 'post',
                url: 'https://social-media-gilad.herokuapp.com/social/api/login',
                data: {
                    email: email,
                    password: password
                }
            })
            setLoading(false)
            // setMessage('Welcome Back, ' + user.data.name.split(" ")[0])
            localStorage.setItem('token', user.data.token)
            setTimeout(() => {
                history.push(`/user/${user.data.user._id}/profile`)
            }, 1500);
        }
        catch (err) {
            console.log(err)
            setLoading(false)
            setMessage('Wrong Inputs, try again')
        }
    }

    const handleClick = () => {
        setExist(!exist)
        setMessage('')
        setPassword('')
        exist ? setToggleMessage(`Alreday have an account? login `) : setToggleMessage(`Don't have an account? Sign up `)
    }

    return (
        <div className="landingPage">
            <div className="logoDiv">    </div>
            <div className="toggleMessage">
                <p>{toggleMessage}</p><p style={{ color: '#e9c46a', fontWeight: 'bold', marginRight: '1.5rem' }} onClick={handleClick}> here</p></div>
            {exist ?
                <Form>
                    <h2>Log In</h2>
                    <Form.Input
                        icon='mail' iconPosition='left' type="email"
                        placeholder='Email' onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Input
                        icon='lock' iconPosition='left'
                        type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={`ui primary button  ${loading ? 'loading' : ''} `} onClick={login}>
                        Log In
                    </button>
                    {message}
                </Form>
                :
                <Form>
                    <h2>New Account</h2>
                    <Form.Field>
                        <Form.Input
                            icon='user' iconPosition='left'
                            placeholder='Full Name' type="text"
                            onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon='mail' iconPosition='left'
                            placeholder='Email' type="email"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon='unlock' iconPosition='left'
                            placeholder='Password' type="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            icon='lock' iconPosition='left'
                            placeholder='Confirm Password' type="password"
                            onChange={(e) => setConfirm(e.target.value)} />
                    </Form.Field>
                    {/* <Button onClick={createNewUser} content='Sign Up' primary /> */}
                    <button className={`ui primary button  ${loading ? 'loading' : ''} `} onClick={createNewUser}>
                        Sign Up </button>
                    <p style={{ color: 'red' }}> {message}</p>
                </Form>
            }
        </div>
    )
}
