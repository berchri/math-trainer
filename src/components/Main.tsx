import { Box, Field, Input, Text, VStack } from '@chakra-ui/react'
import { useAppSelector } from '../store/hooks'

export default function Main() {
    const { calculations, currentIndex, checked } = useAppSelector((state) => state.exercise)
    const answer = useAppSelector((state) => state.answer.value)

    const current = calculations[currentIndex]

    const hasAnswer = answer !== ''
    const isCorrect = checked && hasAnswer && Number(answer) === current?.result
    const isWrong = checked && hasAnswer && !isCorrect

    const correctEmojis = ['🎉', '👍', '🥳', '👏', '😎', '🏆', '🥇', '😜', '😍', '🤩']
    const wrongEmojis = ['☹️', '😣', '😫', '🙄','😮','😒','😭','😵‍💫','😱']

    function pick(arr: string[]) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    const emoji = isCorrect ? pick(correctEmojis) : isWrong ? pick(wrongEmojis) : '🧐'

    return (
        <VStack gap={6} p={8}>
            {current && (
                <Box bg="white" p={8} rounded="xl" shadow="md" textAlign="center" w="full" maxW="400px">
                    <Text fontSize="4xl" fontWeight="bold" fontFamily="mono" mb={6}>
                        {current.expression} =
                    </Text>
                    <Field.Root>
                        <Input
                            placeholder="?"
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
                            {isCorrect ? `✓ Richtig` : isWrong ? `✗ Falsch (Antwort: ${current.result})` : ''}
                        </Text>
                    </Field.Root>
                    <Text fontSize="5xl" mt={4} minH="1.5em">
                        {emoji}
                    </Text>
                    <Text mt={2} fontSize="sm" color="gray.400">
                        {currentIndex + 1} / {calculations.length}
                    </Text>
                </Box>
            )}
        </VStack>
    )
}
