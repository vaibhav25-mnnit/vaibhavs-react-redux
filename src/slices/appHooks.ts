import { TypedUseSelectorHook, useDispatch, useSelector, } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export const useAppDispatch: () => ThunkDispatch<{}, {}, any> = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector