import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Calculation {
  expression: string
  result: number
}

interface ExerciseState {
  id: string | null
  calculations: Calculation[]
  currentIndex: number
}

const initialState: ExerciseState = {
  id: null,
  calculations: [],
  currentIndex: 0,
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateA(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(2, 9)
    const b = randomInt(10 - a, 20 - a)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b })
    }
  }
  return result
}

function generateB(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(11, 18)
    const b = randomInt(2, 20 - a)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b })
    }
  }
  return result
}

function generateC(count: number): Calculation[] {
  const fixedNumber = 5
  const all: Calculation[] = []
  for (let a = 2; a <= 9; a++) {
    all.push({ expression: `${a} + ${fixedNumber}`, result: a + fixedNumber })
  }
  return shuffle(all).slice(0, count)
}

function generateD(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(2, 17)
    const b = randomInt(2, 20 - a)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b })
    }
  }
  return result
}

const generators: Record<string, (count: number) => Calculation[]> = {
  a: generateA,
  b: generateB,
  c: generateC,
  d: generateD,
}

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    startExercise(state, action: PayloadAction<{ id: string; count: number }>) {
      const { id, count } = action.payload
      state.id = id
      state.calculations = generators[id]?.(count) ?? []
      state.currentIndex = 0
    },
    nextCalculation(state) {
      if (state.currentIndex < state.calculations.length - 1) {
        state.currentIndex += 1
      }
    },
    resetExercise(state) {
      state.id = null
      state.calculations = []
      state.currentIndex = 0
    },
  },
})

export const { startExercise, nextCalculation, resetExercise } = exerciseSlice.actions
export default exerciseSlice.reducer
