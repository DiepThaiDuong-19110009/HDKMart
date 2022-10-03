import { React, useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate();

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Phương thức thanh toán</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Chọn phương thức thanh toán</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='PayPal' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='Tiền mặt' id='Money' name='paymentMethod' value='Tiền mặt' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                    <Button type='submit' variant='primary'>Tiếp tục</Button>
                </Form.Group>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen