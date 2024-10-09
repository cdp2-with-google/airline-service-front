import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PATHS } from './constants/paths.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/pages/Main.tsx';
import Chat from './components/pages/Chat.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

/**
 * 라우팅 생길 때마다 추가
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: PATHS.MAIN,
        element: <Main />,
      },
      {
        path: PATHS.CHAT,
        element: <Chat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
