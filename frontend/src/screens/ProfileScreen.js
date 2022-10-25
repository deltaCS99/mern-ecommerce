import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Alert, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { getUserDetails, updateUserProfile} from '../services'

import { Redirect } from 'react-router-dom'


const ProfileScreen = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const redirect = searchParams.get('redirect')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage]= useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.user)

    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const {success, updateUser} = userUpdateProfile 

    useEffect(()=>{
      if(!userInfo){
        navigate('/login')
      }else {
        if(!user?.name){
             dispatch(getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }

    },[updateUser,user,navigate,dispatch, userInfo])


    const submitHandler = (e) => {
      e.preventDefault()
      if(password === confirmPassword){
        dispatch(updateUserProfile({id:user._id,name,email,password}))
      }else{
        setMessage('Passwords do not match')
      }
  }


  return (
    <Row>
        <Col md={5}>
        <h2>User Profile</h2>
        {message && <Alert variant='dark'>{message}</Alert>}
        {error && <Alert variant='dark'>{error['message']}</Alert>}
        {success && <Alert variant='dark'>Profile Updated</Alert>}
        {loading && <div className='text-center' ><Spinner variant='dark'animation='border'/></div>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e)=>setName(e.target.value)}></Form.Control>
           </Form.Group>

           <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}></Form.Control>
           </Form.Group>

           <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}></Form.Control>
           </Form.Group>

           <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
           </Form.Group>

           <Button className='my-3' type='submit' variant='dark'>Update</Button>
        </Form>
        </Col>
        <Col md={7}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen
