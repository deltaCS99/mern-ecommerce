import React, {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col, Alert, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../services'

import FormContainer from '../components/FormContainer'
import { Redirect } from 'react-router-dom'


const LoginScreen = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const redirect = searchParams.get('redirect')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.user)

    const {loading, error, userInfo} = userLogin
    useEffect(()=>{
      if(userInfo&& redirect){
        navigate('/'+redirect)
      }else if(userInfo && !redirect){
        navigate('/')
      }
    },[userInfo])


    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login({email, password}))
  }


  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Alert variant='dark'>{error['message']}</Alert>}
        {loading && <div className='text-center' ><Spinner variant='dark'animation='border'/></div>}
        <Form onSubmit={submitHandler}>
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

           <Button className='my-3' type='submit' variant='dark'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
            New Customer ? <Link  to={redirect ? `/register?redirect=${redirect}`:'/register'} className='text-decoration-underline'>Register</Link>
            </Col>
        </Row>
      
    </FormContainer>
  )
}

export default LoginScreen
