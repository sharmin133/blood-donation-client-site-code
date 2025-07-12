import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Components/Layout/Root/Root.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './Components/context/AuthProvider.jsx';
import DashboardLayouts from './Components/Pages/Dashboard/DashBoardLayouts.jsx';
import Profile from './Components/Pages/Dashboard/Profile.jsx';
import DashboardHome from './Components/Pages/Dashboard/DashboardHome.jsx';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children:[
      {
        index:true, element:<Home></Home>
      },
       { path: 'login', element: <Login></Login>},
      { path: 'register', element:<Register></Register> },
    ]
  },


  {
  path: '/dashboard',
  element: <DashboardLayouts />,
  children: [

    {
       index:true, element:<DashboardHome></DashboardHome>
    },
    {
      path:'profile', element:<Profile></Profile>
    }
    
  ]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
</StrictMode>
)
