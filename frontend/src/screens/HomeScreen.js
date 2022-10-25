import React,{useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {ShimmerThumbnail , ShimmerTitle, ShimmerCircularImage } from 'react-shimmer-effects'
import {getProducts, getCatergories} from '../services'
import Product from '../components/Product'
import Catergory from '../components/Catergory'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector(state => state.productList)
  const {catergories, catLoading, catError} = useSelector(state => state.catergoryList)


  useEffect( () =>{
    dispatch(getCatergories())
  },[dispatch])

  useEffect( () =>{
    dispatch(getProducts())
  },[dispatch])
  
  return (
    <>
    <h3 className="text-center">What are you shopping for today ?</h3>
    {
      catLoading ? (
        <Row className="py-5">
            <Col className='mx-auto' sm={12} md={6} lg={3}>
              <ShimmerCircularImage center={true} size={170} caption/>
              <ShimmerTitle className='mx-auto w-40' line={1} gap={10} variant="secondary" />
            </Col>
            <Col className='mx-auto' sm={12} md={6} lg={3}>
              <ShimmerCircularImage center={true} size={170} caption/>
              <ShimmerTitle className='mx-auto w-40' line={1} gap={10} variant="secondary" />
            </Col>
            <Col className='mx-auto' sm={12} md={6} lg={3}>
              <ShimmerCircularImage center={true} size={170} caption/>
              <ShimmerTitle className='mx-auto w-40' line={1} gap={10} variant="secondary" />
            </Col>
            <Col className='mx-auto' sm={12} md={6} lg={3}>
              <ShimmerCircularImage center={true} size={170} caption/>
              <ShimmerTitle className='mx-auto w-40' line={1} gap={10} variant="secondary" />
            </Col>
        </Row>
      ): catError ? (
        <h2>{catError}</h2>
      ):(
        <Row className="justify-content-center">
          {catergories.map(catergory =>(
            <Col key={catergory._id} sm={12} md={6} lg={3}>
              <Catergory catergory={catergory}/>
            </Col>
          ))}
        </Row>)
    }

    <h3>Latest Products</h3>
    {
      loading ? (
        <Row>
            <Col sm={12} md={6} lg={4}>
              <ShimmerThumbnail width={318} height={214.918} rounded/>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <ShimmerThumbnail width={318} height={214.918} rounded/>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <ShimmerThumbnail width={318} height={214.918} rounded/>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <ShimmerThumbnail width={318} height={214.918} rounded/>
            </Col>
        </Row>
      )
      : error ? (
        <h2>{error}</h2>
      )
      :(
        <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product ={product}/>
                </Col>
            ))}
        </Row>
        )
    }
    </>
  )
}

export default HomeScreen
