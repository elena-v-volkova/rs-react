import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import router from './routes/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = document.getElementById('root');
const queryClient = new QueryClient();

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
