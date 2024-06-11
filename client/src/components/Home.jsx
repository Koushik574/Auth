// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Home Page</h1>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
