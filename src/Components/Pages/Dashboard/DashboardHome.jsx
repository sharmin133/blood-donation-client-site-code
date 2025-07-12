
import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DonarDashBoard from './Dashboard/DonarDashBoard';
import VolunteerDashboard from './Dashboard/VolunteerDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';

const DashboardHome = () => {
      const { userData } = use(AuthContext);
  const role = userData?.role;

    if (role === 'admin') return <AdminDashboard></AdminDashboard>;
  if (role === 'volunteer') return <VolunteerDashboard></VolunteerDashboard>
  if (role === 'donor') return <DonarDashBoard></DonarDashBoard> ;


    return (
        <div>
            <p className="text-red-600">Role not recognized or not logged in.</p>
        </div>
    );
};

export default DashboardHome;