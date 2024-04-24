import {FC, useMemo} from 'react'
import styles from './ShoppingCart.module.css'
import {MainLayout} from '../../layouts/mainLayout'
import {Row, Col, Affix} from 'antd'
import {ProductList, PaymentCard} from '../../components'
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
import {clearShoppingCart, checkout} from '../../redux/shoppingCart/ShoppingCartSlice'
// import {useNavigate} from 'react-router-dom'


export const ShoppingCart:FC=()=>{
  const {loading, items} = useSelector(state=>state.ShoppingCart)
  const jwt = useSelector(state=>state.User.token) as string
  const dispatch = useDispatch()
  // const nav=useNavigate()
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          {
            useMemo(()=>{
              return (
                <div className={styles['product-list-container']}>
                  <ProductList data={items}/>
                </div>
              )
            },[items])
          }
          
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          {
            useMemo(()=>{
              return (
                <Affix>
                  <div className={styles['payment-card-container']}>
                  <PaymentCard loading={loading} originalPrice={items?.map(s=>s.attributes.originalPrice).reduce((a,b)=>a+b,0).toFixed(2)} price={items?.map(s=>s.attributes.price).reduce((a,b)=>a+b,0).toFixed(2)} 
                  onCheckout={()=>{
                    if(items?.length<=0)
                    {
                      return 
                    }
                    dispatch(checkout(jwt)as any)
                    alert("购买成功")
                    }} 
                  onShoppingCartClear={()=>{dispatch(clearShoppingCart(jwt) as any)}}/>
                  </div>
                </Affix>
              )
            },[jwt,items,loading,dispatch])
          }
          
        </Col>
      </Row>
    </MainLayout>
  )
}