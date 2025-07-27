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
import VolunteerAllRequest from './Components/Pages/Dashboard/VolunteerAllRoute/VolunteerAllRequest.jsx';
import BlogsPage from './Components/Pages/Blogs/BlogsPage.jsx';
import BlogsDetailsPage from './Components/Pages/Blogs/BlogsDetailsPage.jsx';
import SearchPage from './Components/Pages/Search/SearchPage.jsx';
import DonationRequest from './Components/Pages/DonationRequests/DonationRequest.jsx';
import DonationRequestDetails from './Components/Pages/DonationRequests/DonationRequestDetails.jsx';
import FundingPage from './Components/Pages/FundingPage/FundingPage.jsx';
import Fund from './Components/Pages/FundingPage/Fund.jsx';
import FundDonation from './Components/Pages/Dashboard/AdminAllRoute/FundDonation.jsx';
import FooterLinks from './Components/Footer/FooterLinks.jsx';



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
      {
       path:'search', element: <SearchPage></SearchPage>
      },

      {
        path:'blogs', element: <BlogsPage></BlogsPage>
      },

      {
        path:'blogs/:id', element: <BlogsDetailsPage></BlogsDetailsPage>
      },
      {
        path:'donation-requests', element: <DonationRequest></DonationRequest>
      },
      {
        path:'donation-requests/:id', element: <DonationRequestDetails></DonationRequestDetails>
      },

      {
        path:'fund', element:<Fund></Fund>
      },
      {
        path:'/fund-page', element:<FundingPage></FundingPage>
      },
      {
        path:'info/:section', element: <FooterLinks></FooterLinks>
      }


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
    {
      path:'users-fund-donation', element: <FundDonation></FundDonation>

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
  path: 'content-management/edit-blog/:id', element: <EditBlogPage></EditBlogPage>
},

//Volunteer 

{
  path:'all-blood-donation-request', element: <VolunteerAllRequest></VolunteerAllRequest>
},

    
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
