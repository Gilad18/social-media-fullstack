import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './login.css'
import { Input, Icon, Button, Form, Radio } from 'semantic-ui-react';

export default function Login() {

    const history = useHistory();

    const [exist, setExist] = useState(false)
    const [gender, setGender] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [message, setMessage] = useState('')

    const createNewUser = async () => {
        if (password === confirm) {
            try {
                const newUser = await axios({
                    method: 'post',
                    url: 'http://localhost:4500/social/api/signin',
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                })
                setMessage(newUser.data.success)
                console.log(newUser)
                localStorage.setItem('token', newUser.data.token)
                setTimeout(() => {
                    history.push(`/user/${newUser.data.newUser._id}/profile`)
                }, 1500);
            } catch(error) {
                console.log(error)
            }
        } else {
            setMessage('Passwords are not matched')
        }
    }
    const login = async () => {
        try {
            const user = await axios({
                method: 'post',
                url: 'http://localhost:4500/social/api/login',
                data: {
                    email: email,
                    password: password
                }
            })
            setMessage(user.data.success)
            localStorage.setItem('token', user.data.token)
            setTimeout(() => {
                history.push(`/user/${user.data.user._id}/profile`)
            }, 1500);
        }
        catch (err) {
            console.log(err)
            setMessage('Wrong Inputs, try again')
        }
    }

    const handleClick = () => {
        setExist(!exist)
        setMessage('')
        setPassword('')
    }

    return (
        <div className="landingPage">
            <p onClick={handleClick}>CHANGE</p>
            {exist ?
                <Form>
                    <h2>Log In</h2>
                    <Form.Input
                        icon='mail' iconPosition='left' type="email"
                        placeholder='Email' onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Form.Input
                        icon='lock' iconPosition='left'
                        type='password' placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button onClick={login} content='Login' primary />
                    {message}
                </Form>
                :
                <Form>
                    <h2>Create Your Account</h2>
                    <div className="radioSec">
                        <Form.Field>
                            <Radio
                                label='Male' name='gender'
                                onChange={(e) => setGender(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Female' name='gender'
                                onChange={(e) => setGender(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Other' name='gender'
                                onChange={(e) => setGender(e.target.value)} />
                        </Form.Field>
                    </div>
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
                    <Button onClick={createNewUser} content='Sign Up' primary />
                    <p style={{ color: 'red' }}> {message}</p>
                </Form>
            }
        </div>
    )
}
