import {FC} from "react";
import styles from './SideMenu.module.css'
import {sideMenuList} from './mockup'
import {Menu} from 'antd'
import { GifOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'

export const SideMenu:FC=()=>{
  const nav=useNavigate()
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList.map((m,index)=>(
        <Menu.SubMenu 
        key={`side-menu-${index}`} 
        title={<span><GifOutlined/>{m.title}</span>}
        >
          {m.subMenu.map((sm,smindex)=>(
            <Menu.SubMenu
            key={`side-menu-${index}-sub-menu-${smindex}`}
            title={<span><GifOutlined/>{sm.title}</span>}
            >
              {sm.subMenu.map((sms,smsindex)=>(
                // Menu.Item将被废除
                <Menu.Item onClick={()=>{nav('/search')}}
                key={`side-menu-${index}-sub-menu-${smindex}-sub-sub-menu-${smsindex}`}
                >
                  <span><GifOutlined/>{sms}</span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}