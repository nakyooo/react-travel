import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import md5 from 'js-md5'

interface UserState {
  loading:boolean
  error:object | null
  token:string | null
  username:string |null
}

const token=localStorage.getItem('token')
const username=localStorage.getItem('username')
const initialState:UserState={
  loading:false,
  error:null,
  token:token,
  username:username
}

export const SignIn =createAsyncThunk(
  "user/SignIn",
  async (paramaters:{
    email:string
    password:string
  })=>{
    const salt = 'dhf8a9e7rh';
    try{
      const { data: res } = await axios.post('http://localhost:1337/api/auth/local',{
        "identifier":paramaters.email,
        "password":md5(paramaters.password+salt)
        // "password":paramaters.password
        }
    )
    return  res
    }catch(e:any){
      alert('账号或密码有错误')
      return e
    }
    
  }
)

export const UserSlice = createSlice({
  name:'User',
  initialState,
  reducers:{
    logOut:(state)=>{
      state.token=null
      state.error=null
      state.loading=false
      state.username=''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  },
  extraReducers:{
    [SignIn.pending.type]:(state)=>{
      state.loading=true
   },
   [SignIn.fulfilled.type]:(state,action)=>{
     state.loading=false
     state.token=action.payload.jwt
     state.username=action.payload.user.username
     state.error=null
     localStorage.setItem('token',state.token as string)
     localStorage.setItem('username',state.username as string)
   },
   [SignIn.rejected.type]:(state,action)=>{
     state.loading=false
     state.error=action.payload.error
   }
  }
})

export const {reducer:UserReducer}=UserSlice
export const {logOut}=UserSlice.actions