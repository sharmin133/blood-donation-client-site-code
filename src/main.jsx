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
import CreateDonarRequest from './Components/Pages/Dashboard/DonarAllRoute/CreateDonarRequest.jsx';
import MyRequestAllDonar from './Components/Pages/Dashboard/DonarAllRoute/MyRequestAllDonar.jsx';
import EditDonarRequest from './Components/Pages/Dashboard/DonarAllRoute/EditDonarRequest.jsx';
import ViewDonarRequest from './Components/Pages/Dashboard/DonarAllRoute/ViewDonarRequest.jsx';
import AllUsers from './Components/Pages/Dashboard/AdminAllRoute/AllUsers.jsx';
import AllDonationRequests from './Components/Pages/Dashboard/AdminAllRoute/AllDonationRequests.jsx';
import ContentManagement from './Components/Pages/Dashboard/AdminAllRoute/ContentManagement.jsx';
import AddBlogPage from './Components/Pages/Dashboard/AdminAllRoute/AddBlogPage.jsx';
import EditBlogPage from './Components/Pages/Dashboard/AdminAllRoute/EditBlogPage.jsx';
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
    },
    {
      path:'create-donation-request', element:<CreateDonarRequest></CreateDonarRequest>
    },
    {
                
      path:'my-requests', element: <MyRequestAllDonar></MyRequestAllDonar>
    },
    {
      path:'edit-donation-request/:id', element: <EditDonarRequest></EditDonarRequest>
    },

    {
      path:'donation-request/:id', element: <ViewDonarRequest></ViewDonarRequest>
    },

    //admin 

    {
      path:'all-users', element:<AllUsers></AllUsers>
    },

    {
      path:'all-requests', element:<AllDonationRequests></AllDonationRequests>
    },
    {
      path:'content-management', element:<ContentManagement></ContentManagement>
    },
    {
      path:'content-management/add-blog', element: <AddBlogPage></AddBlogPage>
    },
   {
  path: 'content-management/edit-blog/:id',
  element: <EditBlogPage></EditBlogPage>
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
