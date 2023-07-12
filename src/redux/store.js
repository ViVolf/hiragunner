import { configureStore } from '@reduxjs/toolkit'
import currentGameReducer from './slices/currentGameSlice'

export default configureStore({
  reducer: {
    currentGame: currentGameReducer,
  }
})