import { useState } from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import CalcOptions from './CalcOptions'
import { exercises } from '../store/exerciseSlice'

interface ExerciseMenuProps {
  onSelect: (id: string, count: number) => void
}

export default function ExerciseMenu({ onSelect }: ExerciseMenuProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [count, setCount] = useState<number>(10)

  const selected = exercises.find((e) => e.id === selectedId)

  return (
    <VStack gap={8} p={8} minH="100vh" justifyContent="center" bg="gray.50">
      <Heading size="2xl">Math Trainer</Heading>

      {!selected ? (
        <>
          <Text color="gray.500">Choose an exercise type to begin</Text>
          <VStack gap={4} w="full" maxW="480px">
            {exercises.map(({ id, label, description }) => (
              <Box
                key={id}
                as="button"
                w="full"
                bg="white"
                p={5}
                rounded="xl"
                shadow="md"
                textAlign="left"
                borderWidth="2px"
                borderColor="transparent"
                _hover={{ borderColor: 'blue.400', shadow: 'lg' }}
                transition="all 0.15s"
                onClick={() => setSelectedId(id)}
              >
                <Text fontWeight="bold" fontSize="lg" fontFamily="mono">{label}</Text>
                <Text color="gray.500" fontSize="sm" mt={1}>{description}</Text>
              </Box>
            ))}
          </VStack>
        </>
      ) : (
        <VStack gap={6} w="full" maxW="480px">
          <Box
            w="full"
            bg="white"
            p={5}
            rounded="xl"
            shadow="md"
            textAlign="left"
            borderWidth="2px"
            borderColor="blue.400"
          >
            <Text fontWeight="bold" fontSize="lg" fontFamily="mono">{selected.label}</Text>
            <Text color="gray.500" fontSize="sm" mt={1}>{selected.description}</Text>
          </Box>

          <CalcOptions
            count={count}
            setCount={setCount}
            selected={selected}
            setSelectedId={setSelectedId}
            onSelect={onSelect}
          />
        </VStack>
      )}
    </VStack>
  )
}
