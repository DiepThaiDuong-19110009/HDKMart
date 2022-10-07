import { React, useEffect, useState } from 'react'
import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, listCategory } from '../actions/productActions'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [showAll, setShowAll] = useState(true)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const categoryList = useSelector(state => state.categoryList)
  const { categories } = categoryList

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCategory())
  }, [dispatch])

  let arrProductGetCateId = []

  const getProductByCategotyId = (product, id) => {
    product.forEach(pro => {
      if (pro.category._id === id) {
        arrProductGetCateId.push(pro)
      }
    });
  }

  const getCategoryId = (id) => e => {
    arrProductGetCateId.length = 0
    getProductByCategotyId(products, id)
    setData(arrProductGetCateId)
    setShowAll(false)
  }

  const showAllProduct = () => {
    setShowAll(true)
  }

  // Search
  const myOptions = [];
  const getDataSearch = (product) => {
    product.forEach(prod => {
      myOptions.push(prod.name)
    })
  }

  getDataSearch(products)

  const [selectedOptions, setSelectedOptions] = useState('');

  const handleSubmit = () => console.log('==', selectedOptions);

  return (
    <div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        < Container >
          <Row>
            <Col>
              <div>
                <h3>Tìm kiếm sản phẩm</h3>
                <Autocomplete style={{ maxWidth: 500, height: 100 }} options={myOptions} onChange={(event, value) => setSelectedOptions(value)}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder='Tìm kiếm sản phẩm...' />
                  )}
                />
                <button onClick={handleSubmit}>Tìm kiếm</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={0} md={0} lg={4} xl={3}>
              <h3>Danh mục sản phẩm</h3>
              <ListGroup as="ul">
                <ListGroup.Item className='hoverCate' onClick={showAllProduct} >Tất cả sản phẩm</ListGroup.Item>
                {categories.map(category => (
                  <ListGroup.Item className='hoverCate' key={category._id} onClick={getCategoryId(category._id)} as="li">{category.name}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            {showAll === false ? (data.map(product => (
              <Col key={product.id} sm={0} md={0} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))) : (
              products.map(product => (
                <Col key={product.id} sm={0} md={0} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
        </Container>}
    </div >
  )
}

export default HomeScreen