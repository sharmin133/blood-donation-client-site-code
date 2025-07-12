import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const DonarDashBoard = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        Welcome, {userData?.name}!
      </h2>
    </div>
  );
};

export default DonarDashBoard;
