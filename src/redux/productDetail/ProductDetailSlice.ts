import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
interface ProductDetailState {
  loading:boolean
  error:string | null
  product:any
}

const initialState:ProductDetailState={
  loading:true,
  error:null,
  product:null
}

export const getProductDetail =createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId:string)=>{
    const { data: res } = await axios.get(`http://localhost:1337/api/tourist-routes/${touristRouteId}?populate=*`)
    return  res.data
  }
)

export const ProductDetailSlice = createSlice({
  name:'ProductDetail',
  initialState,
  reducers:{
  },
  extraReducers:{
    [getProductDetail.pending.type]:(state)=>{
      state.loading=true
   },
   [getProductDetail.fulfilled.type]:(state,action)=>{
     state.loading=false
     state.product=action.payload
     state.error=null
   },
   [getProductDetail.rejected.type]:(state,action:PayloadAction<string|null>)=>{
     state.loading=false
     state.error=action.payload
   }
  }
})

export const {reducer:ProductDetailReducer}=ProductDetailSlice
