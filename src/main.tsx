import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { PATHS } from './constants/paths.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/pages/Main';
import Chat from './components/pages/Chat.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { GOOGLE_CLIENT_ID } from './constants/oauth.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthWrapper from './AuthWrapper.tsx';

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
        element: <AuthWrapper />,
        children: [
          {
            path: PATHS.CHAT,
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
