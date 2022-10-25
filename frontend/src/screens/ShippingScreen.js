import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../reducers/cartReducer'


const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [township, setTownship] = useState(shippingAddress.township)
    const [city, setCity] = useState(shippingAddress.city)
    const [province, setProvince] = useState(shippingAddress.province)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, township, city, province, postalCode, country}))
        navigate('/payment')

    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e)=>setAddress(e.target.value)}></Form.Control>
        </Form.Group>

    <Form.Group controlId='township'>
            <Form.Label>Township</Form.Label>
            <Form.Control
            type='text'
            placeholder='e.g Orlando West'
            value={township}
            onChange={(e)=>setTownship(e.target.value)}></Form.Control>
    </Form.Group>

        <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder='e.g Soweto'
                value={city}
                onChange={(e)=>setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='province'>
                <Form.Label>Province</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Province'
                value={province}
                onChange={(e)=>setProvince(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e)=>setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='dark'>Continue</Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
