import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const Catergory = ({catergory}) => {
  return (
        <>
        <Card className='catergory-card my-3 p-3 text-center'>
            <Link to={`/catergory/${catergory._id}`}>
                <Card.Img src={catergory.image} variant='top' className="catergory-img"/>
            </Link>
    
            <Card.Body>
                <Link to={`/catergory/${catergory._id}`}>
                    <Card.Title as='div' className="text-center">
                        <strong>{catergory.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
        </>
      )
}

export default Catergory
