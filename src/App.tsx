import { useState } from 'react'
import VerticalSplitter from './components/ui/VerticalSplitter'
import Main from './components/Main'
import NumberKeyboard from './components/NumberKeyboard'
import ExerciseMenu from './components/ExerciseMenu'
import { useAppDispatch } from './store/hooks'
import { pressKey } from './store/answerSlice'
import { startExercise, resetExercise } from './store/exerciseSlice'

function App() {
  const dispatch = useAppDispatch()
  const [exerciseId, setExerciseId] = useState<string | null>(null)

  if (!exerciseId) {
    return <ExerciseMenu onSelect={(id, count) => {
      setExerciseId(id)
      dispatch(startExercise({ id, count }))
    }} />
  }

  return (
    <VerticalSplitter
      top={<Main />}
      bottom={
        <NumberKeyboard
          onKeyPress={(key) => {
            if (key === 'home') {
              setExerciseId(null)
              dispatch(resetExercise())
              return
            }
            dispatch(pressKey(key))
          }}
        />
      }
    />
  )
}

export default App

