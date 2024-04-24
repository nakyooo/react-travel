import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import jwt_decode, {JwtPayload as DefaultJwtPayload} from 'jwt-decode'
import axios from 'axios'
interface ShoppingCartState {
  items:any[],
  loading:boolean,
  error:string|null,
  checkClean:boolean,
}

const initialState:ShoppingCartState={
  items:[],
  loading:false,
  error:null,
  checkClean:false,
}
interface JwtPayload extends DefaultJwtPayload {
  id:string
}

// 异步action的内部命名空间的名称
export const getShoppingCart = createAsyncThunk("shoppingCart/getShoppingCart",async (jwt:string)=>{
  const token = jwt_decode<JwtPayload>(jwt)
  const userId=token.id
  try{
    const {data: res}= await axios.get(`http://localhost:1337/api/shopping-carts?populate=*&filters[userId][$eq]=${userId}`,{
    headers:{
      Authorization:`bearer ${jwt}`
      // Authorization:'bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwNDEzNzEyLCJleHAiOjE2ODMwMDU3MTJ9.GZdzXyY_at0fLitUPpdljc5yh0DewlZZ2aMtLvokcAg'
    }
  })   
  return res.data[0].attributes.shoppingCartItems.data
  }catch(e:any){
    console.log(e);
  }
})
export const addShoppingCartItem = createAsyncThunk("shoppingCart/addShoppingCartItem",async (parameters:{jwt:string, touristRouteId:string})=>{
  const token = jwt_decode<JwtPayload>(parameters.jwt)
  const userId=token.id
  try{
    const {data: res}= await axios.get(`http://localhost:1337/api/shopping-carts/${userId}?populate=*`,{
    headers:{
      Authorization:`bearer ${parameters.jwt}`
    }
  })
  const shoppingcartitems:any[]=res.data.attributes.shoppingCartItems.data
  const shoppingcartitemsid:number[]=shoppingcartitems?.map((item:any)=>item.id)
  console.log(shoppingcartitemsid);
  
  if(shoppingcartitemsid.includes(+parameters.touristRouteId))
  {
    alert('此商品已经在您的购物车了咯')
  }
  else {
    const {data: res2}= await axios.put(`http://localhost:1337/api/shopping-carts/${userId}?populate=*`,
  {
    "data": {
      "userId": userId+"",
      "shoppingCartItems": [
        parameters.touristRouteId+"",...shoppingcartitemsid
      ]
    }
  },{
    headers:{
      Authorization:`bearer ${parameters.jwt}`
    },

  })
  
  return res2.data.attributes.shoppingCartItems.data
  }
  return res.data.attributes.shoppingCartItems.data
  }catch(e){
    console.log(e);
  }
  
})
export const clearShoppingCart = createAsyncThunk("shoppingCart/clearShoppingCart",async (jwt:string)=>{
  const token = jwt_decode<JwtPayload>(jwt)
  const userId=token.id
  const {data: res}= await axios.put(`http://localhost:1337/api/shopping-carts/${userId}?populate=*`,
  {
    "data": {
      "userId": userId+'',
      "shoppingCartItems": [
      ]
    }
  },{
    headers:{
      Authorization:`bearer ${jwt}`
    },

  })
  return res.data.attributes.shoppingCartItems.data
})

export const checkout = createAsyncThunk("shoppingCart/checkout",async (jwt:string)=>{
  const token = jwt_decode<JwtPayload>(jwt)
  const userId=token.id
  const {data: res}= await axios.put(`http://localhost:1337/api/shopping-carts/${userId}?populate=*`,
  {
    "data": {
      "userId": userId+'',
      "shoppingCartItems": [
      ]
    }
  },{
    headers:{
      Authorization:`bearer ${jwt}`
    },

  })
  return res.data.attributes.shoppingCartItems.data
})


export const ShoppingCartSlice = createSlice({
  name:'shoppingCart',
  initialState,
  reducers:{
    changeCheck:(state,action)=>{
      state.checkClean=action.payload
    }
  },
  extraReducers:{
    // js中[getDetailAction.pending]，ts中[getDetailAction.pending.type]是ts需要类型
    [getShoppingCart.fulfilled.type]:(state,action: PayloadAction<any[]>)=>{
      // fetch_recommend_products_success(actions.payload)
      state.loading=false
      state.error=null
      state.items=action.payload
    },
    [getShoppingCart.rejected.type]:(state,action: PayloadAction<null | string>)=>{
      state.loading=false
      state.error=action.payload
    },
    [getShoppingCart.pending.type]:(state)=>{
      state.loading=true
    },
    // js中[getDetailAction.pending]，ts中[getDetailAction.pending.type]是ts需要类型
    [addShoppingCartItem.fulfilled.type]:(state,action: PayloadAction<any[]>)=>{
      // fetch_recommend_products_success(actions.payload)
      state.loading=false
      state.error=null
      state.items=action.payload
    },
    [addShoppingCartItem.rejected.type]:(state,action: PayloadAction<null | string>)=>{
      state.loading=false
      state.error=action.payload
    },
    [addShoppingCartItem.pending.type]:(state)=>{
      state.loading=true
    },
    // js中[getDetailAction.pending]，ts中[getDetailAction.pending.type]是ts需要类型
    [clearShoppingCart.fulfilled.type]:(state,action: PayloadAction<any[]>)=>{
      // fetch_recommend_products_success(actions.payload)
      state.loading=false
      state.error=null
      state.items=action.payload
    },
    [clearShoppingCart.rejected.type]:(state,action: PayloadAction<null | string>)=>{
      state.loading=false
      state.error=action.payload
    },
    [clearShoppingCart.pending.type]:(state)=>{
      state.loading=true
    },
    [checkout.fulfilled.type]:(state,action: PayloadAction<any[]>)=>{
      // fetch_recommend_products_success(actions.payload)
      state.loading=false
      state.error=null
      state.items=action.payload
    },
    [checkout.rejected.type]:(state,action: PayloadAction<null | string>)=>{
      state.loading=false
      state.error=action.payload
    },
    [checkout.pending.type]:(state)=>{
      state.loading=true
    }
  }
})

export const {reducer:shoppingcartReducer}=ShoppingCartSlice
export const {changeCheck}=ShoppingCartSlice.actions