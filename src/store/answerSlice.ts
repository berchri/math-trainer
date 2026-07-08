import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AnswerState {
  value: string
}

const initialState: AnswerState = { value: '' }

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    pressKey(state, action: PayloadAction<string>) {
      const key = action.payload
      if (key === 'backspace') {
        state.value = state.value.slice(0, -1)
      } else if (key === 'clear') {
        state.value = ''
      } else if (key === '.' && state.value.includes('.')) {
        // ignore second decimal point
      } else if (key === '-' && state.value !== '') {
        // only allow - as the first character
      } else {
        state.value += key
      }
    },
    clearAnswer(state) {
      state.value = ''
    },
  },
})

export const { pressKey, clearAnswer } = answerSlice.actions
export default answerSlice.reducer
