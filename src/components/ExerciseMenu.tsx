import { useState } from 'react'
import { Box, Button, Heading, Text, VStack, HStack, SimpleGrid } from '@chakra-ui/react'

const exercises = [
  { id: 'a', label: '(a < 10) + (b?) = (c ≤ 20)', description: 'Small numbers, find the missing addend' },
  { id: 'b', label: '(a > 10) + (b?) = (c ≤ 20)', description: 'Larger first number, find the missing addend' },
  { id: 'c', label: '(1 < a < 10) + (b = x) = ?', description: 'Fixed second number, find the sum' },
  { id: 'd', label: '(a > 1) + (b > 1) = (c ≤ 20)', description: 'Both numbers greater than 1' },
]

const countOptions = [5, 10, 20, 50]

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

          <VStack gap={3} w="full">
            <Text fontWeight="semibold" color="gray.600">Number of calculations</Text>
            <SimpleGrid columns={4} gap={3} w="full">
              {countOptions.map((n) => (
                <Button
                  key={n}
                  variant={count === n ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setCount(n)}
                >
                  {n}
                </Button>
              ))}
            </SimpleGrid>
          </VStack>

          <HStack gap={3} w="full">
            <Button flex={1} variant="outline" onClick={() => setSelectedId(null)}>
              Back
            </Button>
            <Button flex={2} colorScheme="blue" onClick={() => onSelect(selected.id, count)}>
              Start
            </Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}
