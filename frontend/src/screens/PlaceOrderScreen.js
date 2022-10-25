import React, {useState} from 'react'
import {Button, Row, Col, ListGroup, Image, Card, Alert} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) =>{
        return (Math.round(num*100)/100).toFixed(2)
    }


    cart['itemsPrice'] = addDecimals(cart.cartItems.reduce((acc, item)=>{
        return acc+item.price*item.qty
    }, 0))

    cart['shippingPrice'] = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    cart['taxPrice'] = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart['totalPrice'] = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = () => {
        console.log("order")
    }
    
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4/>

      <Row>
        <Col md={8}>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.township}, {cart.shippingAddress.city}, {' '}
                    {cart.shippingAddress.postalCode}, {' '}
                    {cart.shippingAddress.province}, {' '}
                    {cart.shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Items</h2>
                {cart.cartItems.length === 0 ? <Alert variant='dark'>Cart is empty</Alert>:(
                    <ListGroup.Item variant='flush'>
                        {cart.cartItems.map((item, index)=>
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>

                                    <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={1}>
                                      {item.qty} items
                                    </Col>
                                    
                                    <Col md={1}>
                                        R {item.price}
                                    </Col>

                                    <Col md={1}>
                                        R {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                    </ListGroup.Item>
                )}
            </ListGroup.Item>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>R {cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>R {cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>R {cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>R {cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button  type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
