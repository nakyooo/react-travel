import { configureStore} from '@reduxjs/toolkit'
import {languageReducer} from './language/languageSlice'
import {recommendReducer} from './recommendProducts/recommendProductsSlice'
import {actionLog} from './middlewares/actionLog'
import {ProductDetailReducer} from './productDetail/ProductDetailSlice'
import {ProductSearchReducer} from './productSearch/ProductSearchSlice'
import {UserReducer} from './user/UserSlice'
import {shoppingcartReducer} from './shoppingCart/ShoppingCartSlice'
const store = configureStore({
  reducer:{
    language:languageReducer,
    recommendProducts:recommendReducer,
    productDetail:ProductDetailReducer,
    productSearch:ProductSearchReducer,
    User:UserReducer,
    ShoppingCart:shoppingcartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})
// .concat(actionLog)
export type RootState = ReturnType<typeof store.getState>


export default store