import { Button, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { Exercise } from '../store/exerciseSlice';
const countOptions = [5, 10, 15, 20]

interface CalcOptionsProps {
    count: number
    setCount: (count: number) => void
    selected: Exercise
    setSelectedId: (id: string | null) => void
    onSelect: (id: string, count: number) => void
}

export default function CalcOptions({ count, setCount, selected, setSelectedId, onSelect }: CalcOptionsProps) {
    return (
        <>
            <VStack gap={3} w="full">
                <Text fontWeight="semibold" color="gray.600">Anzahl der Berechnungen</Text>
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
                    Zurück
                </Button>
                <Button flex={2} colorScheme="blue" onClick={() => onSelect(selected.id, count)}>
                    Start
                </Button>
            </HStack>
        </>
    )
}