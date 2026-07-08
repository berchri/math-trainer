import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import answerReducer from './answerSlice'
import exerciseReducer from './exerciseSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    answer: answerReducer,
    exercise: exerciseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
