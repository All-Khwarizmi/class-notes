import React from 'react'
import {render} from '@testing-library/react'
import {Providers } from "@/app/providers";
import { ThemeProvider } from "@/components/theme-provider";


const AllTheProviders = ({children}) => {
  return (
    <Providers>

     <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

          {children}
          </ThemeProvider>
    </Providers>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}