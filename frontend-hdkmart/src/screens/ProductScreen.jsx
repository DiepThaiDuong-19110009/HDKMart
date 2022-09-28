import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = () => {
    const productId = useParams();
    console.log('==', productId);
    const product = products.find((p) => p._id === productId.id)

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name}/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>

                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen