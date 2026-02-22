import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import ErrorPage from '@/pages/ErrorPage'
import './index.css'


/**
 * 💥 CHAOS TEST COMPONENT
 * This exists solely to trigger the ErrorPage.jsx we built.
 * When a user navigates to /crash, this will throw an error.
 */
function ChaosComponent() {
  throw new Error("Staff Engineer Simulation: Component Crashed Successfully.");
}

// 1. Initialize the Server-State Cache
const queryClient = new QueryClient()

// 2. Define the Routing Map
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "success",
        element: (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 font-mono text-xs animate-pulse">
            REACHED_SUCCESS_ROUTE
          </div>
        )
      },
      {
        path: "crash",
        element: <ChaosComponent />
      }
    ]
  }
]);

// 3. Render the Provider Tree
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)