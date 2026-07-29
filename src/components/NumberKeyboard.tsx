import { Button, Center, Grid, GridItem } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { BsArrowLeft, BsArrowRight, BsBackspace, BsCheck, BsHouseGear } from "react-icons/bs";

const iconMap: Record<string, ReactNode> = {
  home: <BsHouseGear />,
  backspace: <BsBackspace />,
  validate: <BsCheck />,
  previous: <BsArrowLeft />,
  next: <BsArrowRight />,
}

const keys: { label: string; colSpan?: number }[] = [
  { label: 'home' }, { label: 'previous' }, { label: 'next' },
  { label: '7' }, { label: '8' }, { label: '9' },
  { label: '4' }, { label: '5' }, { label: '6' },
  { label: '1' }, { label: '2' }, { label: '3' },
  { label: '-' }, { label: '0' }, { label: '.' },
  { label: 'backspace' }, { label: 'validate', colSpan: 2 },
]

export default function NumberKeyboard({ onKeyPress, disabledKeys = {} }: {
  onKeyPress: (key: string) => void
  disabledKeys?: Partial<Record<string, boolean>>
}) {
  return (
    <Center boxSize="full">
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(6, 1fr)"
        gap={2}
        w="full"
        h="full"
        maxW="400px"
        maxH="350px"
        p={2}
      >
        {keys.map(({ label, colSpan }) => (
          <GridItem key={label} colSpan={colSpan} display="flex">
            <Button w="full" flex="1" size="lg" variant="outline" disabled={!!disabledKeys[label]} onClick={() => onKeyPress(label)}>
              {iconMap[label] ?? label}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Center>
  )
}
