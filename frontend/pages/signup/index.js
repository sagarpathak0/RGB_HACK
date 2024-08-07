import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import {useRouter} from 'next/navigation'
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    // Clear previous errors
    setError('');
    setSuccess('');
    if (!name || !email || !password){
      setError("Name email and password are required");
    }
    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send data to backend
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('User created successfully');
        // Optionally redirect to sign-in page or another page
        setTimeout(() =>{
          router.replace('/signin')
        },1000)
      } else {
        setError(result.message || 'Sign-up failed');
      }
    } catch (error) {
      setError('Server error');
    }


  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="flex flex-grow items-center justify-center bg-sign">
        <div className="relative w-full max-w-md p-8 bg-sign rounded shadow-lg">
          <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-100 rounded-bl-md shadow-md" style={{ transform: 'rotate(45deg)', transformOrigin: 'top right' }}></div>

          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="flex justify-between mb-6">
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign up with Facebook"
              onClick={() => console.log('Sign up with Facebook')}
            >
              <FaFacebookF className="mx-auto" />
            </button>
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign up with Google"
              onClick={() => console.log('Sign up with Google')}
            >
              <FaGoogle className="mx-auto" />
            </button>
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign up with Apple"
              onClick={() => console.log('Sign up with Apple')}
            >
              <FaApple className="mx-auto" />
            </button>
          </div>

          <form className='text-white' onSubmit={handleSubmit}>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block  font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block  font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Create a password"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block  font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-white">
            Already have an account? <a href="signin" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
