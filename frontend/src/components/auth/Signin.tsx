import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinInitialState } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { isAxiosError } from 'axios';

function Signin() {
  const [formData, setFormData] = useState(signinInitialState);
  const navigate = useNavigate();

  const { doSignin, signinError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await doSignin(formData);
    if (result.success) {
      navigate('/');
    }

    setFormData(signinInitialState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isAxiosError(signinError)) {
    // TODO:: show toast
    console.error(signinError.response?.data.message);
  }

  return (
    <div className="flex h-screen">
      {/* left */}
      <div className="flex-1 text-center self-center text-3xl font-medium tracking-wider select-none">
        ChitChat
      </div>

      {/* right */}
      <div className="flex-1 self-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600">Sign in to continue to your account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-sm">
          <input
            name="email"
            value={formData.email}
            type="email"
            onChange={handleInputChange}
            className="border border-gray-300 text-sm rounded-lg p-2.5"
            placeholder="Email address"
            required
          />

          <input
            name="password"
            value={formData.password}
            type="password"
            onChange={handleInputChange}
            className="border border-gray-300 text-sm rounded-lg p-2.5"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-indigo-500 px-3 py-2 rounded-md font-semibold text-white tracking-wide cursor-pointer"
          >
            Sign in
          </button>
          <div
            onClick={() => navigate('/signup')}
            className="text-sm text-center text-gray-600 font-semibold"
          >
            Don't have an account?{' '}
            <span className="text-indigo-500 cursor-pointer font-medium underline underline-offset-2">
              Signup
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signin;
