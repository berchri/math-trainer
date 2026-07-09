import { useState } from 'react'
import VerticalSplitter from './components/ui/VerticalSplitter'
import Main from './components/Main'
import NumberKeyboard from './components/NumberKeyboard'
import ExerciseMenu from './components/ExerciseMenu'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { pressKey, clearAnswer } from './store/answerSlice'
import { startExercise, resetExercise, nextCalculation, previousCalculation, checkAnswer, uncheckAnswer } from './store/exerciseSlice'

function App() {
  const dispatch = useAppDispatch()
  const { currentIndex, calculations, checked } = useAppSelector((state) => state.exercise)
  const answer = useAppSelector((state) => state.answer.value)
  const [exerciseId, setExerciseId] = useState<string | null>(null)

  if (!exerciseId) {
    return <ExerciseMenu onSelect={(id, count) => {
      setExerciseId(id)
      dispatch(startExercise({ id, count }))
    }} />
  }

  function handleKeyPress(key: string) {
    if (key === 'home') { setExerciseId(null); dispatch(resetExercise()); return }
    if (key === 'validate') { dispatch(checkAnswer(answer)); return }
    if (key === 'next') { dispatch(nextCalculation()); dispatch(clearAnswer()); return }
    if (key === 'previous') { dispatch(previousCalculation()); if (currentIndex > 0) dispatch(clearAnswer()); return }
    if (key === 'backspace') { dispatch(uncheckAnswer()) }
    dispatch(pressKey(key))
  }

  const disabledKeys = {
    previous: currentIndex === 0,
    next: currentIndex === calculations.length - 1,
    validate: checked,
  }

  return (
    <VerticalSplitter
      top={<Main />}
      bottom={<NumberKeyboard onKeyPress={handleKeyPress} disabledKeys={disabledKeys} />}
    />
  )
}

export default App

