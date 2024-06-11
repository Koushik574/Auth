// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { handleRegister } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ name, email, password, phonenumber, dob });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white rounded-lg shadow-md px-8 py-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
