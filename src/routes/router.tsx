import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import DetailedCard from '../components/detailedCard/DetailedCard';
import About from './about/About';
import Page404 from './404/Page404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

export default router;
