import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signupInitialState } from '../../types';
import { isAxiosError } from 'axios';
import { useAuth } from '../../hooks/useAuth';

function Signup() {
  const [formData, setFormData] = useState(signupInitialState);
  const navigate = useNavigate();

  const { doSignup, signupError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await doSignup(formData);
    if (result.success) {
      navigate('/signin');
    }

    setFormData(signupInitialState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isAxiosError(signupError)) {
    // TODO:: show toast
    console.error(signupError.response?.data.message);
  }

  return (
    <div className="flex h-screen">
      {/* left */}
      <div className="flex-1 text-center self-center text-3xl font-medium tracking-wider">
        ChitChat
      </div>

      {/* right */}
      <div className="flex-1 self-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to ChitChat</h1>
        <p className="text-gray-600">Create new account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-sm">
          <input
            name="name"
            value={formData.name}
            type="text"
            onChange={handleInputChange}
            className="border border-gray-300 text-sm rounded-lg p-2.5"
            placeholder="Name"
            required
          />
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
            Sign up
          </button>
          <div className="text-sm text-center text-gray-600 font-semibold">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/signin')}
              className="text-indigo-500 cursor-pointer font-medium underline underline-offset-2"
            >
              SignIn
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
