import axios from 'axios';
import React, { useState } from 'react';
import InputField from '../components/common/InputField'; // Make sure the path is correct

function Login() {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log(res);
      localStorage.setItem('userId', res.data.user._id);
      // Navigate or show success
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={login}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log in to your account
        </h2>

        <div className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpass(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-3 text-center">{error}</p>
        )}

        <div className="flex justify-end mt-2 text-sm">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Log in
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
