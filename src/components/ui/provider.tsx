"use client"

import { ChakraProvider, ClientOnly, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ClientOnly fallback={<>{props.children}</>}>
        <ColorModeProvider {...props} />
      </ClientOnly>
    </ChakraProvider>
  )
}
