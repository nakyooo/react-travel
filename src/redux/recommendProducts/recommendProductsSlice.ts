import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
interface RecommendProductsState {
  productList:any[],
  loading:boolean,
  error:string|null
}

const initialState:RecommendProductsState={
  productList:[],
  loading:true,
  error:null
}
// 异步action的内部命名空间的名称
export const giveMeDataAction = createAsyncThunk("recommendProductsSlice/giveMeDataAction",async ()=>{
  const {data: res}= await axios.get('http://localhost:1337/api/product-collections?populate=*')   
  return res.data
})

export const recommendProductsSlice = createSlice({
  name:'recommendProducts',
  initialState,
  reducers:{
    // fetch_recommend_products_start(state){
    //   state.loading=true
    // },
    // fetch_recommend_products_success(state,action){
    //   state.loading=false
    //   state.productList=action.payload
    // },
    // fetch_recommend_products_fail(state,action){
    //   state.loading=false
    //   state.error=action.payload
    // }
  },
  extraReducers:{
    // js中[getDetailAction.pending]，ts中[getDetailAction.pending.type]是ts需要类型
    [giveMeDataAction.fulfilled.type]:(state,action: PayloadAction<any[]>)=>{
      // fetch_recommend_products_success(actions.payload)
      state.loading=false
      state.productList=action.payload
    },
    [giveMeDataAction.rejected.type]:(state,action: PayloadAction<null | string>)=>{
      state.loading=false
      state.error=action.payload
    },
    [giveMeDataAction.pending.type]:(state)=>{
      state.loading=true
    }
  }
})

export const {reducer:recommendReducer}=recommendProductsSlice
// export const {fetch_recommend_products_start,fetch_recommend_products_success,fetch_recommend_products_fail}=recommendProductsSlice.actions