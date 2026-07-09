import { configureStore, type Middleware } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import answerReducer from './answerSlice'
import exerciseReducer from './exerciseSlice'

const exerciseLogger: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action)
  const { exercise } = storeAPI.getState()
  console.log('[exercise]', (action as { type: string }).type, exercise)
  return result
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    answer: answerReducer,
    exercise: exerciseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exerciseLogger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
