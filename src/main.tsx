import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './utils/ErrorBoundary.tsx';
import Page404 from './components/pages/404/Page404.tsx';
import About from './components/pages/about/About.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

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
