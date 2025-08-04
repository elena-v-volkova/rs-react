import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import router from './routes/router.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

{
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
