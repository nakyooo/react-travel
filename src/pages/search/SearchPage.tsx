import {FC, useEffect, useMemo} from 'react'
import {ProductList} from '../../components'
import {useLocation, useParams} from 'react-router-dom'
import {searchProduct} from '../../redux/productSearch/ProductSearchSlice'
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
import {Spin} from 'antd'
import styles from './SearchPage.module.css'
import {MainLayout} from '../../layouts/mainLayout'

type MatchParams ={
  keywords:string
}

export const SearchPage:FC = ()=>{
  const {keywords=''} = useParams<MatchParams>()
  const memoizedKeywords = useMemo(() => keywords, [keywords])
  const {loading, product, error} = useSelector(state=>state.productSearch)
  const dispatch = useDispatch()
  const location = useLocation()
  const memoizedLocation = useMemo(() => location, [location])
  useEffect(()=>{
    dispatch(searchProduct(memoizedKeywords) as any)
  },[memoizedLocation,memoizedKeywords])
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
      {/* 产品列表 */}
      <div className={styles['product-list-container']}>
        <ProductList data={product} />
      </div>
    </MainLayout>
  )
}