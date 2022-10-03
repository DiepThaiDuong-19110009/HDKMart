import { React, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFormCart } from '../actions/cartActions'

const CartScreen = () => {
  let location = useLocation();
  const productId = useParams().id
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  // Comfirm Remove

  const removeFromCartHandler = (id) => {
    dispatch(removeFormCart(id))
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/shipping')
    }
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Giỏ hàng</h1>
        {cartItems.length === 0 ? <Message>Giỏ hàng trống <Link to='/'>Mua hàng</Link></Message> :
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                      {
                        [...Array(item.quantity).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Tổng sản phẩm: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Sản phẩm</h2>
              Tổng tiền: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} VNĐ
            </ListGroup.Item>
            <ListGroup.Item class="d-flex justify-content-center py-3">
              <Button type='button' variant="success" className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Tiến hành thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen