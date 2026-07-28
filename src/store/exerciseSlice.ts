import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Calculation {
  expression: string
  result: number
  solved: boolean
}

export interface ExerciseProp {
  label: string
  description: string
  value: number
  min: number
  max: number
}

export interface Exercise {
  id: string
  type: 'addition' | 'subtraction'
  label: string
  description: string
  props?: Record<string, ExerciseProp>
  generate: (count: number, nr?: number) => Calculation[]
}

interface ExerciseState {
  id: string | null
  calculations: Calculation[]
  currentIndex: number
  checked: boolean
}

const initialState: ExerciseState = {
  id: null,
  calculations: [],
  currentIndex: 0,
  checked: false,
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

// (a>0) + (b>0) = (c<=20)
function generateA(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(1, 19)
    const b = randomInt(1, 20 - a)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b, solved: false })
    }
  }
  return result
}

// (a<10)+b=(c<=20)
function generateB(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(1, 9)
    const b = randomInt(10 - a, 20 - a )
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b, solved: false })
    }
  }
  return result
}

// (a<10)+(b<10)=(10<=c<=20)
function generateBB(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(1, 9)
    const b = randomInt(10 - a, 9)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b, solved: false })
    }
  }
  return result
}

// (a>10) + b = (c<=20)
function generateC(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(11, 19)
    const b = randomInt(1, 20 - a)
    const key = `${a}+${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} + ${b}`, result: a + b, solved: false })
    }
  }
  return result
}

// (1<a<10) + (b=x) = c
function generateD(count: number, nr?: number): Calculation[] {
  const fixedNumber = nr ?? 5
  const all: Calculation[] = []
  for (let a = 2; a <= 9; a++) {
    all.push({ expression: `${a} + ${fixedNumber}`, result: a + fixedNumber, solved: false })
  }
  return shuffle(all).slice(0, count)
}

// (a>1) - (b>1) = (c>=0)
function generateE(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(3, 20)
    const b = randomInt(2, a)
    const key = `${a}-${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} - ${b}`, result: a - b, solved: false })
    }
  }
  return result
}

// (a<10) - b = (c>=0)
// function generateF(count: number): Calculation[] {
//   const seen = new Set<string>()
//   const result: Calculation[] = []
//   while (result.length < count) {
//     const a = randomInt(2, 9)
//     const b = randomInt(1, a)
//     const key = `${a}-${b}`
//     if (!seen.has(key)) {
//       seen.add(key)
//       result.push({ expression: `${a} - ${b}`, result: a - b, solved: false })
//     }
//   }
//   return result
// }

// (a>10) - b = (c>=0)
function generateG(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(11, 20)
    const b = randomInt(1, a - 10)
    const key = `${a}-${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} - ${b}`, result: a - b, solved: false })
    }
  }
  return result
}

// (a≤10) - (b<10) = (c<=10)
function generateGG(count: number): Calculation[] {
  const seen = new Set<string>()
  const result: Calculation[] = []
  while (result.length < count) {
    const a = randomInt(10, 19)
    const b = randomInt(a - 10, 9)
    const key = `${a}-${b}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ expression: `${a} - ${b}`, result: a - b, solved: false })
    }
  }
  return result
}

// (1<a<10) - (b=x) = c
// function generateH(count: number, nr?: number): Calculation[] {
//   const fixedNumber = nr ?? 5
//   const all: Calculation[] = []
//   for (let a = 2; a <= 9; a++) {
//     if (a >= fixedNumber) {
//       all.push({ expression: `${a} - ${fixedNumber}`, result: a - fixedNumber, solved: false })
//     }
//   }
//   return shuffle(all).slice(0, count)
// }


export const exercises: Exercise[] = [
  { id: 'a', type: 'addition', label: 'a + b = (c ≤ 20)', description: 'Summanden sind größer als 0. Summe ist kleiner gleich 20.', generate: generateA },
  { id: 'bb', type: 'addition', label: '⭐(a < 10) + (b < 10) = (c ≤ 20)', description: 'Summanden sind kleiner als 10. Summe zwischen 10 und 20.', generate: generateBB },
  { id: 'b', type: 'addition', label: '(a < 10) + b = (c ≤ 20)', description: 'Erster Summand ist kleiner als 10. Summe ist kleiner gleich 20.', generate: generateB },
  { id: 'c', type: 'addition', label: '(a > 10) + b = (c ≤ 20)', description: 'Erster Summand ist größer als 10. Summe ist kleiner gleich 20.', generate: generateC },
  {
    id: 'd', type: 'addition', label: '(a < 10) + (b = x) = ?', description: 'Erster Summand ist eine Zahl von 2 bis 9. Zweiter Summand ist fest wählbar.',
    props: { nr: { label: 'Festgelegte Zahl', description: 'Wählen Sie eine feste Zahl für den zweiten Summanden.', value: 5, min: 1, max: 10 } },
    generate: generateD,
  },
  { id: 'e', type: 'subtraction', label: 'a - b = (0 ≤ c ≤ 20)', description: 'Summanden sind größer als 1. Differenz ist größer gleich 0.', generate: generateE },
  // { id: 'f', type: 'subtraction', label: '(a < 10) - b = (c ≥ 0)', description: 'Erster Summand ist kleiner als 10. Differenz ist größer gleich 0.', generate: generateF },
  { id: 'g', type: 'subtraction', label: '(a ≥ 10) - b = (c ≥ 10)', description: 'Erster Summand ist größer als 10. Differenz ist größer gleich 10.', generate: generateG },
  { id: 'gg', type: 'subtraction', label: '⭐(10 ≤ a < 20) - (b < 10) = (c ≤ 10)', description: 'Erster Summand ist eine Zehnerzahl bis 19. Differenz ist kleiner gleich 10.', generate: generateGG },
  // {
  //   id: 'h', type: 'subtraction', label: '(1 < a < 10) - (b = x) = ?', description: 'Erster Summand ist eine Zahl von 2 bis 9. Zweiter Summand ist fest wählbar.',
  //   props: { nr: { label: 'Festgelegte Zahl', description: 'Wählen Sie eine feste Zahl für den zweiten Summanden.', value: 5, min: 1, max: 10 } },
  //   generate: generateH,
  // },
]

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    startExercise(state, action: PayloadAction<{ id: string; count: number; options?: Record<string, number> }>) {
      const { id, count, options } = action.payload
      state.id = id
      state.calculations = exercises.find((e) => e.id === id)?.generate(count, options?.nr) ?? []
      state.currentIndex = 0
      state.checked = false
    },
    nextCalculation(state) {
      if (state.currentIndex < state.calculations.length - 1) {
        state.currentIndex += 1
        state.checked = false
      }
    },
    previousCalculation(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1
        state.checked = false
      }
    },
    checkAnswer(state, action: PayloadAction<string>) {
      state.checked = true
      const current = state.calculations[state.currentIndex]
      if (current && Number(action.payload) === current.result) {
        current.solved = true
      }
    },
    uncheckAnswer(state) {
      state.checked = false
    },
    resetExercise(state) {
      state.id = null
      state.calculations = []
      state.currentIndex = 0
      state.checked = false
    },
  },
})

export const { startExercise, nextCalculation, previousCalculation, checkAnswer, uncheckAnswer, resetExercise } = exerciseSlice.actions
export default exerciseSlice.reducer
