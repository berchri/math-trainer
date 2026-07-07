import { Box, Button, ButtonGroup, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { decrement, increment, reset } from './store/counterSlice'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack gap={6}>
        <Heading size="2xl">Math Trainer</Heading>
        <Text fontSize="lg" color="gray.600">
          Built with Vite · React · TypeScript · Chakra UI · Redux Toolkit
        </Text>
        <Box bg="white" p={8} rounded="xl" shadow="md" textAlign="center">
          <Text fontSize="5xl" fontWeight="bold" mb={4}>
            {count}
          </Text>
          <ButtonGroup gap={3}>
            <Button colorScheme="red" onClick={() => dispatch(decrement())}>
              −
            </Button>
            <Button colorScheme="gray" variant="outline" onClick={() => dispatch(reset())}>
              Reset
            </Button>
            <Button colorScheme="green" onClick={() => dispatch(increment())}>
              +
            </Button>
          </ButtonGroup>
        </Box>
        <HStack gap={4}>
          <a href="https://vite.dev/" target="_blank" rel="noreferrer">
            Vite
          </a>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            React
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
            TypeScript
          </a>
          <a href="https://www.chakra-ui.com/" target="_blank" rel="noreferrer">
            Chakra UI
          </a>
          <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
            Redux Toolkit
          </a>
        </HStack>
      </VStack>
    </Box>
  )
}

export default App
