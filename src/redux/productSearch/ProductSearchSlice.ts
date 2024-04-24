import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
interface ProductSearchState {
  loading:boolean
  error:string | null
  product:any
}

const initialState:ProductSearchState={
  loading:true,
  error:null,
  product:null,
}

export const searchProduct =createAsyncThunk(
  "productSearch/searchProduct",
  async (keywords:string)=>{
    const newkeywords= encodeURIComponent(keywords)
    const { data: res } = await axios.get(`http://localhost:1337/api/tourist-routes?filters[title][$contains]=${newkeywords}`)
    return  res.data
  }
)

export const ProductSearchSlice = createSlice({
  name:'ProductSearch',
  initialState,
  reducers:{
  },
  extraReducers:{
    [searchProduct.pending.type]:(state)=>{
      state.loading=true
   },
   [searchProduct.fulfilled.type]:(state,action)=>{
     state.loading=false
     state.product=action.payload
     state.error=null
   },
   [searchProduct.rejected.type]:(state,action:PayloadAction<string|null>)=>{
     state.loading=false
     state.error=action.payload
   }
  }
})

export const {reducer:ProductSearchReducer}=ProductSearchSlice
