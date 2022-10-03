import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.photo} alt={product.name} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.quantity} text={`${product.quantity} đánh giá`} />
                </Card.Text>
                <Card.Text as='h3'>
                    {product.price} VNĐ
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product