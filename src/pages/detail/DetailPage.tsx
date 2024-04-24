import {FC,useEffect,useMemo} from 'react'
import {useParams} from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Affix, Button} from 'antd'
import styles from './DetailPage.module.css'
import {ProductIntro, ProductComments} from '../../components'
import {commentMockData} from './mockup'
import {getProductDetail} from '../../redux/productDetail/ProductDetailSlice'
import {useSelector} from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import {MainLayout} from '../../layouts/mainLayout'
import {ShoppingCartOutlined, ShoppingOutlined} from '@ant-design/icons'
import {addShoppingCartItem} from '../../redux/shoppingCart/ShoppingCartSlice'

type MatchParams = {
  touristRouteId:string
}
const { RangePicker } = DatePicker



export const DetailPage:FC=()=>{
  const {touristRouteId="1"} = useParams<MatchParams>()
  const memoizedTouristRouteId = useMemo(() => touristRouteId, [touristRouteId])
  // const [loading,setLoading] = useState<boolean>(true)
  // const [product,setProduct] = useState<any>(null)
  // const [error,setError] = useState<string|null>(null)
  const {loading, product, error} = useSelector(state=>state.productDetail)
  const dispatch = useDispatch()
  const jwt = useSelector(state=>state.User.token) as string
  const {loading:shoppingCartLoading} = useSelector(state=>state.ShoppingCart)

  useEffect(()=>{
    dispatch(getProductDetail(memoizedTouristRouteId)as any)
  },[memoizedTouristRouteId])
  if(loading)
  return <Spin size='large' style={{
    marginTop:200,
    marginBottom:200,
    marginLeft:"auto",
    marginRight:"auto",
    width:"100%"
  }}/>

  if(error)
  return <div>网站出错:{error}</div>
  
  return (
    <MainLayout>
        {/* 产品简介与日期选择 */}
        <div className={styles['product-intro-container']}>
          <Row>
            <Col span={13}>
              <ProductIntro 
              title={product.attributes.title}
              shortDescription={product.attributes.description}
              price={product.attributes.originalPrice}
              coupons={product.attributes.coupons}
              points={product.attributes.points}
              discount={product.attributes.price}
              rating={product.attributes.rating}
              pictures={product.attributes.tourist_route_picture_pictures.data.map((p:any)=>p.attributes)}
              />
              </Col>
            <Col span={11}>
              <Button style={{marginTop:50, marginBottom:30, display:"block"}} type="primary" danger loading={shoppingCartLoading} onClick={()=>{
                dispatch(addShoppingCartItem({jwt, touristRouteId:product.id})as any)
              }}>
                <ShoppingOutlined/>
                放入购物车
              </Button>
            <RangePicker open style={{marginTop:20}}/>
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Affix>
        <div className={styles['product-detail-anchor']}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </div>
        </Affix>
        {/* 产品特色 */}
        <div id='feature' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.attributes.features}} style={{margin:50}}></div>
        </div>
        {/* 费用 */}
        <div id='fees' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.attributes.fees}} style={{margin:50}}></div>
        </div>
        {/* 预定须知 */}
        <div id='notes' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html:product.attributes.notes}} style={{margin:50}}></div>
        </div>
        {/* 商品评价 */}
        <div id='comments' className={styles['product-detail-container']}>
          <Divider orientation='center'>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{margin:40}}>
            <ProductComments data={commentMockData}/>
          </div>
        </div>
    </MainLayout>
  )
  
}