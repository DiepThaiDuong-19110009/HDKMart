import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    console.log('==', user);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    console.log('==', userInfo.user);

    useEffect(() => {
        if (!userInfo) {
            navigate('/user/:userId')
        } else {
            setName(userInfo.user.name)
            setEmail(userInfo.user.email)
        }
    }, [dispatch, navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Mật khẩu không trùng khớp')
        } else {
            // Dispatch update profile
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Thông tin người dùng</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control type='name' placeholder='Nhập tên người dùng' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type='password' placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type='password' placeholder='Nhập lại mật khẩu' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Cập nhật</Button>
                </Form>
            </Col>
            <Col md={9}>Đơn hàng của tôi</Col>
        </Row>
    )
}

export default ProfileScreen