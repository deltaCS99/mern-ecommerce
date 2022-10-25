import React,{useState, useEffect,} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Breadcrumb, Form} from 'react-bootstrap'
import {ShimmerThumbnail, ShimmerTitle} from 'react-shimmer-effects'
import {getProduct} from '../services'
import Rating from '../components/Rating'


const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {product, loading, error} = useSelector(state => state.productDetails)


  useEffect( () =>{
    dispatch(getProduct(id))
  },[id,dispatch])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  return (
    <>
    {
      loading ? (
        <>
        <ShimmerTitle className='w-100' line={1} variant="primary" />
        <Row>
            <Col md={6}>
              <ShimmerThumbnail height={366} rounded/>
            </Col>
            <Col md={3}>
              <ShimmerThumbnail height={225} rounded/>
            </Col>
            <Col md={3}>
              <ShimmerThumbnail height={136} rounded/>
            </Col>
        </Row>
        </>
      )
      : error ? (
        <h2>{error}</h2>
      )
      :(
        <>
          <Breadcrumb >
            <Breadcrumb.Item className='text-decoration-underline' href='/'>
              Home
            </Breadcrumb.Item>
      
            <Breadcrumb.Item className='text-decoration-underline' href={`/catergory/${product['category']?._id}`}>
              {product['category']?.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          
          <Row>
      
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid/>
            </Col>
      
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: R{product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
      
            <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                      Price :
                      </Col>
      
                      <Col>
                      <strong>R{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
      
      
                  <ListGroup.Item>
                    <Row>
                      <Col>
                      Status :
                      </Col>
      
                      <Col>
                      {product.countInStock > 0 ? 'In Stock':'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                            {
                            [...Array(product.countInStock).keys()].map(i => (
                              <option key={i+1} value={i+1}>
                                {i+1}
                              </option>
                            ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                  }
      
                  <ListGroup.Item className=''>
                    <Button onClick ={addToCartHandler} variant='outline-dark' className='w-100' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                  </ListGroup.Item>
      
                </ListGroup>
            </Col>
          </Row>
        </>
        )
    }
    </>
  )
}

export default ProductScreen
