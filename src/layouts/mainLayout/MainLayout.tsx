import {FC} from 'react'
import styles from './MainLayout.module.css'
import {Header, Footer} from '../../components'

interface Props {
  children :any
}

export const MainLayout:FC<Props>=({children})=>{
  return (
    <>
    <Header/>
      {/* 页面内容 */}
      <div className={styles['page-content']}>
        {children}
      </div>
      <Footer/>
    </>
  )
}