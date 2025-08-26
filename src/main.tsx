import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.ts'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { ThemeProvider } from './providers/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
)
