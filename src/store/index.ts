import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

// RootState agrega el tipado estricto de como luce el store
export type RootState = ReturnType<typeof store.getState>
// AppDispatch es para que tengamos el tipado estricto de a que acciones vamos a poder hacerles un dispatch
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//Exportaciones necesarias para que funcione con Typescript
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
