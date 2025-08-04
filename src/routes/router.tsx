import { createBrowserRouter } from 'react-router-dom';
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
        path: '/',
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

export default router;
