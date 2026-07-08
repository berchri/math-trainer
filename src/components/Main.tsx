import { useState } from 'react'
import { Box, Button, Field, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { nextCalculation } from '../store/exerciseSlice'
import { clearAnswer } from '../store/answerSlice'

export default function Main() {
    const dispatch = useAppDispatch()
    const { calculations, currentIndex } = useAppSelector((state) => state.exercise)
    const answer = useAppSelector((state) => state.answer.value)
    const [checked, setChecked] = useState(false)

    const current = calculations[currentIndex]
    const isLast = currentIndex === calculations.length - 1

    const hasAnswer = answer !== ''
    const isCorrect = checked && hasAnswer && Number(answer) === current?.result
    const isWrong = checked && hasAnswer && !isCorrect

    function handleNext() {
        dispatch(nextCalculation())
        dispatch(clearAnswer())
        setChecked(false)
    }

    return (
        <VStack gap={6} p={8}>
            <Heading size="2xl">Math Trainer</Heading>
            {current && (
                <Box bg="white" p={8} rounded="xl" shadow="md" textAlign="center" w="full" maxW="400px">
                    <Text fontSize="4xl" fontWeight="bold" fontFamily="mono" mb={6}>
                        {current.expression} = ?
                    </Text>
                    <Field.Root>
                        <Input
                            placeholder="your answer"
                            value={answer}
                            onChange={() => {}}
                            readOnly
                            size="lg"
                            textAlign="center"
                            fontSize="2xl"
                            borderColor={isCorrect ? 'green.400' : isWrong ? 'red.400' : undefined}
                            borderWidth={checked && hasAnswer ? '2px' : undefined}
                            color={isCorrect ? 'green.600' : isWrong ? 'red.600' : undefined}
                        />
                        <Text mt={2} fontSize="sm" fontWeight="semibold"
                            color={isCorrect ? 'green.500' : isWrong ? 'red.500' : 'gray.400'}
                            minH="1.25em"
                        >
                            {isCorrect ? '✓ Correct' : isWrong ? `✗ Wrong (answer: ${current.result})` : ''}
                        </Text>
                    </Field.Root>
                    <Text mt={2} fontSize="sm" color="gray.400">
                        {currentIndex + 1} / {calculations.length}
                    </Text>
                </Box>
            )}
            <HStack w="full" maxW="400px" gap={3}>
                <Button
                    flex={1}
                    colorScheme="teal"
                    size="lg"
                    disabled={!hasAnswer || checked}
                    onClick={() => setChecked(true)}
                >
                    Prüfen
                </Button>
                <Button
                    flex={1}
                    colorScheme="blue"
                    size="lg"
                    disabled={isLast}
                    onClick={handleNext}
                >
                    {isLast ? 'Done' : 'Next'}
                </Button>
            </HStack>
        </VStack>
    )
}
