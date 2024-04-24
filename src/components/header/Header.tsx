import {FC, useState, useEffect,useMemo,useCallback} from "react";
import styles from './Header.module.css'
import { Layout, Typography, Input, Menu, Button, Dropdown} from "antd"
import { GlobalOutlined} from '@ant-design/icons'
// import type { MenuProps } from 'antd'
import {useNavigate, Link} from 'react-router-dom'
import {changeLanguage} from '../../redux/language/languageSlice'
import { MenuInfo } from "rc-menu/lib/interface";
import {useTranslation} from 'react-i18next'
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
// import jwt_decode, {JwtPayload as DefaultJwtPayload} from 'jwt-decode'
import {logOut} from '../../redux/user/UserSlice'


// interface JwtPayload extends DefaultJwtPayload {
//   username:string,
//   id:string
// }

// const menuitems = [
//   { label: '旅游首页', key: 'menuitem-1' }, 
//   { label: '周末游', key: 'menuitem-2' },
//   { label: '跟团游', key: 'menuitem-3' }, 
//   { label: '自由行', key: 'menuitem-4' },
//   { label: '私家团', key: 'menuitem-5' }, 
//   { label: '邮轮', key: 'menuitem-6' },
//   { label: '酒店+景点', key: 'menuitem-7' }, 
//   { label: '当地玩乐', key: 'menuitem-8' },
//   { label: '主题游', key: 'menuitem-9' }, 
//   { label: '定制游', key: 'menuitem-10' },
//   { label: '游学', key: 'menuitem-11' }, 
//   { label: '签证', key: 'menuitem-12' },
//   { label: '企业游', key: 'menuitem-13' }, 
//   { label: '高端游', key: 'menuitem-14' },
//   { label: '爱玩户外', key: 'menuitem-15' }, 
//   { label: '保险', key: 'menuitem-16' },
// ];

// const items: MenuProps['items'] = [
//   {
//     label: '中文',
//     key: 'zh'
//   },
//   {
//     label: 'English',
//     key: 'en'
//   },
// ];

// const menuProps = {
//   items,
//   // onClick: handleMenuClick,
// };

export const Header:FC=()=>{
  const {t} = useTranslation()
  const language = useSelector(state =>state.language.language)
  const languageList = useSelector(state=>state.language.languageList)
  const dispatch = useDispatch()
  // const jwt = useSelector(state=>state.User.token)
  const username=useSelector(state=>state.User.username)
  const [name,setname]=useState("")
  const {items, loading} = useSelector(state=>state.ShoppingCart)
  const memoizedUsername = useMemo(() => username, [username]);

  useEffect(()=>{
    if(memoizedUsername){
      setname(memoizedUsername)
    }
  },[memoizedUsername])
  const nav=useNavigate()
  const onLogout=useCallback(()=>{
    dispatch(logOut())
    nav('/')
    window.location.reload()
  },[dispatch,nav])

  const menuClickHandler=useCallback((e:MenuInfo)=>{
    dispatch(changeLanguage(e.key))
  },[dispatch])

  return (
    <div className={styles['app-header']}>
        {/* top-header */}

        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <div className={styles.language}>
              <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button style={{marginLeft: 15,width: 0, display:"inline-flex"}}
          overlay={
            <Menu onClick={menuClickHandler}>
              {languageList.map(l=><Menu.Item key={l.code}>{l.name}</Menu.Item>)}
            </Menu>
          } 
          icon={<GlobalOutlined></GlobalOutlined>}
          >
            {language==='zh'?'中文':'English'}
          </Dropdown.Button>
            </div>

          {username ?
          <Button.Group>
              <span>{t("header.welcome")}
              <Typography.Text strong>{name }</Typography.Text>
              </span>
            <Button loading={loading} onClick={()=>nav('/shoppingCart')}>{t("header.shoppingCart")}({items?.length || 0})</Button>
            <Button onClick={onLogout}>{t("header.signOut")}</Button>
          </Button.Group>
          :
          <Button.Group>
            <Button onClick={()=>{nav('/register')}}>{t("header.register")}</Button>
            <Button onClick={()=>{nav('/signIn')}}>{t("header.signin")}</Button>
          </Button.Group>
        }

          </div>
        </div>
        
        <Layout.Header className={styles['main-header']}>
          <Link to={'/'}>
          <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATlJREFUeNrsV0sOgjAQpWzc1q0rjwA3wCNwAIM3AW8i8QAcQW4AR3DlVrau8DWZBZA0HdsSMDrJCxqm8+lM35QgsJTXdVcAPaGwtSMcAuiH/zfHh5WtMFhYXAI4a367ia/acu2JuWqrswfZwma36h7wXduRvWH2VscQW3rCIwOSyasaKOHgMgsPwPEejwqIDKotkCKQu7cAyHkDSGa8aptjThDcJqw+cB6QbuWFiKjmkUXzRbTWHAAUpYJGJ3M4Aca1IbHTU0HDfIlDAImJGdUO5IP3+URZzsA9I3+rYEIt801Zy5OM/AnGKbg59EGNJA6uPFA6ZGtcy2XCxoILWmQf+2LClOiVKx2t8XMlI06PadAYM+fOgVWM4/+d8LvvhIYpyroTLt4rwtK5pBH+o9+GVEcv3w9vAQYA/2y0hwYktv8AAAAASUVORK5CYII="} alt='' className={styles['App-logo']}></img>
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          </Link>
          <Input.Search placeholder='请输入旅游目的地、主题或关键字' className={styles['search-input']} onSearch={(keywords)=>{nav('/search/'+keywords)}}></Input.Search>
        </Layout.Header>
        {/* <Menu mode="horizontal" className={styles['main-menu']} items={menuitems}> */}
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1" onClick={()=>{nav('/')}}> {t("header.home_page")} </Menu.Item>
        <Menu.Item key="2" onClick={()=>{nav('/search')}}> {t("header.weekend")} </Menu.Item>
        <Menu.Item key="3" onClick={()=>{nav('/search')}}> {t("header.group")} </Menu.Item>
        <Menu.Item key="4" onClick={()=>{nav('/search')}}> {t("header.backpack")} </Menu.Item>
        <Menu.Item key="5" onClick={()=>{nav('/search')}}> {t("header.private")} </Menu.Item>
        <Menu.Item key="6" onClick={()=>{nav('/search')}}> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7" onClick={()=>{nav('/search')}}> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8" onClick={()=>{nav('/search')}}> {t("header.local")} </Menu.Item>
        <Menu.Item key="9" onClick={()=>{nav('/search')}}> {t("header.theme")} </Menu.Item>
        <Menu.Item key="10" onClick={()=>{nav('/search')}}> {t("header.custom")} </Menu.Item>
        <Menu.Item key="11" onClick={()=>{nav('/search')}}> {t("header.study")} </Menu.Item>
        <Menu.Item key="12" onClick={()=>{nav('/search')}}> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13" onClick={()=>{nav('/search')}}> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14" onClick={()=>{nav('/search')}}> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15" onClick={()=>{nav('/search')}}> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16" onClick={()=>{nav('/search')}}> {t("header.insurance")} </Menu.Item>
      </Menu>
      </div>
  )
}
