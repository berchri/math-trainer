import { Center, Splitter } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface VerticalSplitterProps {
  top: ReactNode
  bottom: ReactNode
}

export default function VerticalSplitter({ top, bottom }: VerticalSplitterProps) {
  return (
    <Splitter.Root
      panels={[{ id: 'top' }, { id: 'bottom' }]}
      orientation="vertical"
      minH="100vh"
      minW="100vw"
      bg="gray.50"
    >
      <Splitter.Panel id="top">
        <Center boxSize="full">{top}</Center>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="top:bottom" />
      <Splitter.Panel id="bottom">
        {bottom}
      </Splitter.Panel>
    </Splitter.Root>
  )
}
