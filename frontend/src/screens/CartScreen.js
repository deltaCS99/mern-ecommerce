import React, {useEffect} from 'react'
import {Link, useParams,useSearchParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { getCartProduct } from '../services'
import { removeItem } from '../reducers/cartReducer'

const CartScreen = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {id} = useParams()
    const qty = Number(searchParams.get('qty'))
    const {cartItems, loading, err} = useSelector(state => state.cart)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(id){
            dispatch(getCartProduct({id,qty}))
        }
    },[dispatch, id, qty])

    const removeFromCartHandler = (id) =>{
      dispatch(removeItem(id))
    }

    const checkoutHandler = () =>{
      navigate('/login?redirect=shipping')
    }

    
  return (
    <>
    <h1>Cart</h1>
    <Row>
      <Col className='cart-items-cart-card' xs={{ order: 'last' }} md={8}>
        {cartItems.length === 0 ? 
        <h3>Cart is empty <Link to='/'>Go Back</Link></h3>
        :(
          <ListGroup variant='flush'>
            {
              cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col xs={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col xs={3} md={4}>
                      <Link className='text-decoration-underline' to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col xs={2} md={2}>R{item.price}</Col>
                    <Col className='justify-content-center' xs={3} md={2}>
                      <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch(getCartProduct({id:item.product, qty:Number(e.target.value)}))}>
                              {
                              [...Array(item.countInStock).keys()].map(i => (
                                <option key={i+1} value={i+1}>
                                  {i+1}
                                </option>
                              ))
                              }
                      </Form.Control>
                    </Col>
                    <Col xs={1} md={1}>
                      <Button type='button' variant='dark' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        )
      }
      </Col>
      <Col xs={{ order: 'first' }} md={{ order: 'last' }}>
        <Card variant='flush' className='p-3'>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc, item ) => acc+ item.qty, 0)}) items</h2>
            R {cartItems.reduce((acc, item)=> acc+ item.qty*item.price, 0).toFixed(2)}
          </ListGroup.Item>

          <ListGroup.Item>
            <Button variant='dark' type='button' className='btn-block w-100' disabled={cartItems.length === 0} onClick = {checkoutHandler}>CheckOut</Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row></>
  )
}

export default CartScreen
