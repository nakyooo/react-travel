import {FC, useEffect, useMemo} from 'react';
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCart} from './pages'
import {useSelector} from './redux/hooks'
import {useDispatch} from 'react-redux'
import {getShoppingCart} from './redux/shoppingCart/ShoppingCartSlice'


interface PrivateRouteProps {
  children:any
  redirectTo:string
  isAuthenticated:boolean
}

const RequireAuth: FC<PrivateRouteProps> = ({ children, redirectTo, isAuthenticated}) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

const App:FC=()=> {
  const jwt = useSelector(state=>state.User.token)
  const memoizedJwt = useMemo(() => jwt, [jwt])
  const dispatch = useDispatch()
  useEffect(()=>{
    if(memoizedJwt)
    {
      dispatch(getShoppingCart(memoizedJwt) as any)
      // console.log(jwt);
    }
  },[memoizedJwt])
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signIn' element={<SignInPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/detail/:touristRouteId' element={<DetailPage/>}/>
          <Route path='/search/:keywords?' element={<SearchPage/>}/>
          {/* <PrivateRoute isAuthenticated={jwt!==null} path='/shoppingCart' element={ShoppingCart}/> */}
          <Route path="/shoppingCart" element={
              <RequireAuth redirectTo="/signIn" isAuthenticated={(memoizedJwt!==null)}>
                <ShoppingCart/>
              </RequireAuth>
            }
          />
          <Route path='*' element={<h1>404 not found</h1>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
