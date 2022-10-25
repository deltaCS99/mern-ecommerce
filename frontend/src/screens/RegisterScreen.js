import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Alert, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../services'

import FormContainer from '../components/FormContainer'
import { Redirect } from 'react-router-dom'


const RegisterScreen = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const redirect = searchParams.get('redirect')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage]= useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, user} = userRegister

    useEffect(()=>{
      if(user){
        navigate(redirect)
      }

    },[user,navigate,redirect])


    const submitHandler = (e) => {
      e.preventDefault()
      if(password === confirmPassword){
         dispatch(register({name, email, password}))
      }else{
        setMessage('Passwords do not match')
      }
  }


  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Alert variant='dark'>{message}</Alert>}
        {error && <Alert variant='dark'>{error['message']}</Alert>}
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

           <Button className='my-3' type='submit' variant='dark'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Have Account ? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'} className='text-decoration-underline'>Login</Link>
            </Col>
        </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
