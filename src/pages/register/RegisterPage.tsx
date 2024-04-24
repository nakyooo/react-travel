import {FC} from 'react'
import {UserLayout} from '../../layouts/userLayout'
import {RegisterForm} from './RegisterForm'
export const RegisterPage:FC=()=>{
  return (
    <UserLayout>
      <RegisterForm/>
    </UserLayout>
  )
}