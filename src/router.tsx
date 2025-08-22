import { createBrowserRouter } from 'react-router-dom';
import BookletPage from './pages/BookletPage';
import Layout from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BookletPage />,
      },
    ],
  },
]);

export default router; 