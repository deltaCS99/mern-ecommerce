import React, { useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {ShimmerThumbnail , ShimmerTitle} from 'react-shimmer-effects'
import Product from '../components/Product'
import {getCatergory} from '../services'

const ProductsByCatergoryScreen = () => {
  const {catergory} = useParams()
  const dispatch = useDispatch()
  const {productsByCatergory, loading, error} = useSelector(state => state.productsByCatergoryList)


  useEffect( () =>{
    dispatch(getCatergory(catergory))
  },[dispatch])

  const products = productsByCatergory.products
  return (
    <>
    {
      loading ? (
        <>
          <ShimmerTitle className='w-30' line={1} variant="primary" />
          <Row>
              <Col sm={12} md={6} lg={4}>
                <ShimmerThumbnail height={455.578} rounded/>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ShimmerThumbnail height={455.578} rounded/>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ShimmerThumbnail height={455.578} rounded/>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ShimmerThumbnail height={455.578} rounded/>
              </Col>
          </Row>
        </>
      )
      : error ? (
        <h2>{error}</h2>
      )
      :(
        <>
          <h3>{productsByCatergory.catergory}</h3>
          <Row>
              {products && products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4}>
                      <Product product ={product}/>
                  </Col>
              ))}
          </Row>
        </>
      )
    }
    </>
  )
}

export default ProductsByCatergoryScreen
