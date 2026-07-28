import { useState } from 'react'
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import CalcOptions from './CalcOptions'
import { exercises } from '../store/exerciseSlice'

interface ExerciseMenuProps {
  onSelect: (id: string, count: number, options?: Record<string, any>) => void
}

export default function ExerciseMenu({ onSelect }: ExerciseMenuProps) {
  const [type, setType] = useState<'addition' | 'subtraction' | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [count, setCount] = useState<number>(10)

  const filtered = exercises.filter((e) => e.type === type)
  const selected = exercises.find((e) => e.id === selectedId)

  return (
    <VStack gap={8} p={8} minH="100vh" justifyContent="center" bg="gray.50">
      <Heading size="2xl">Math Trainer</Heading>

      {!type ? (
        <>
          <Text color="gray.500">Choose an exercise type to begin</Text>
          <VStack gap={4} w="full" maxW="480px">
            {(['addition', 'subtraction'] as const).map((t) => (
              <Box
                key={t}
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
                onClick={() => setType(t)}
              >
                <Text fontWeight="bold" fontSize="lg" fontFamily="mono">
                  {t === 'addition' ? 'Addition (+)' : 'Subtraktion (−)'}
                </Text>
              </Box>
            ))}
          </VStack>
        </>
      ) : !selected ? (
        <>
          <Text color="gray.500">Choose an exercise to begin</Text>
          <VStack gap={4} w="full" maxW="480px">
            {filtered.map(({ id, label, description }) => (
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
            <Button variant="outline" onClick={() => setType(null)}>
              Zurück
            </Button>
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
            setSelectedId={(id) => { setSelectedId(id) }}
            onSelect={onSelect}
          />
        </VStack>
      )}
    </VStack>
  )
}
