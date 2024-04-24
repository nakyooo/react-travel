import {useSelector as useReduxSelector, TypedUseSelectorHook} from 'react-redux'
import { RootState} from './store'


// 在使用 useSelector 时，它会自动识别并返回根状态类型为 RootState 的状态值。 不重写useSelector会导致ts识别类型unknown，无法识别类型
export const useSelector:TypedUseSelectorHook<RootState> = useReduxSelector