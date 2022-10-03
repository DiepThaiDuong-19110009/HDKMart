import { React, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const formatPrice = (n) => {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    // Calculate price
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = cart.itemsPrice < 500000 ? 0 : 10000
    cart.taxPrice = Number((0.02 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const placeOrderHandler = () => {
        alert('abc')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Đặt hàng</h2>
                            <p>
                                <strong>Tên người nhận: </strong>
                                {userInfo.username}
                            </p>
                            <p>
                                <strong>Địa chỉ: </strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.country}
                            </p>
                            <p>
                                <strong>Số điện thoại nhận hàng: </strong>
                                {cart.shippingAddress.phone}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Phương thức thanh toán</h2>
                            <strong>Thanh toán bằng: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Chi tiết đơn hàng</h2>
                            {cart.cartItems.length === 0 ? <Message>Giỏ hàng trống</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={5}>
                                                        {item.qty} x {item.price} VNĐ = {item.qty * item.price} VNĐ
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng thanh toán</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng tiền hàng</Col>
                                    <Col>{cart.itemsPrice} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Chi phí giao hàng</Col>
                                    <Col>{cart.shippingPrice} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế (5%)</Col>
                                    <Col>{cart.taxPrice} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng thanh toán</Col>
                                    <Col>{formatPrice(cart.totalPrice)} VNĐ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Thanh toán</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen