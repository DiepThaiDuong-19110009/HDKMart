import { React, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, country, phone }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2  />
            <h1>Giao hàng</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label>Địa chỉ nhận hàng</Form.Label>
                    <Form.Control type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control type='text' placeholder='Nhập tên thành phố' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Tỉnh</Form.Label>
                    <Form.Control type='text' placeholder='Nhập tên tỉnh' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Số điện thoại người nhận</Form.Label>
                    <Form.Control type='number' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Tiếp tục</Button>
            </Form>

        </FormContainer>
    )
}

export default ShippingScreen