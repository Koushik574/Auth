// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for handling errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call handleLogin function from AuthContext
      await handleLogin({ email, password });
    } catch (error) {
      // Handle login error
      setError(error.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Your logo and other content */}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {/* Your form inputs */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {/* Remember me checkbox and forgot password link */}
          <div className="flex items-center justify-between">
            {/* Remember me checkbox */}
            {/* Forgot password link */}
          </div>
          {/* Sign in button */}
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          {/* Error message */}
          {error && <p className="text-red-500">{error}</p>}
          {/* Sign up link */}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
