import {FC} from 'react'
import {Comment, Tooltip, List} from 'antd'

interface PropsType {
  data:{
    author:string,
    avatar:string,
    content:string,
    createDate:string
  }[]
}

export const ProductComments:FC<PropsType>=({data})=>{
  return (
    <List
    dataSource={data}
    itemLayout="horizontal"
    renderItem={(item)=>{
      return (
        <li>
        <Comment
        author={item.author}
        avatar={item.avatar}
        content={item.content}
        datetime={item.createDate}
        />
      </li>
      )
      
    }}
    >
    </List>
  )
}