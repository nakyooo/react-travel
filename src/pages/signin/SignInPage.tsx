import {FC} from 'react'
import {UserLayout} from '../../layouts/userLayout'
import {SignInForm} from './SignInForm'

export const SignInPage:FC=()=>{
  // console.log(props);
  return (
    <UserLayout>
      <SignInForm/>
    </UserLayout>
  )
}