import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './utils/ErrorBoundary.tsx';
import About from './routes/about/About.tsx';
import Page404 from './routes/404/Page404.tsx';
import DetailedCard from './components/detailedCard/DetailedCard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DetailedCard />,
      },
    ],
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
