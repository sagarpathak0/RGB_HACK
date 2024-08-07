import React from 'react'
import Navbar from '@/components/navbar'
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import {login} from '../../components/auth'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(' ');
  const [success, setSuccess] = useState(' ');
  const router = useRouter()


  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      // Redirect the user to the Google authentication URL
      window.location.href = "http://localhost:8080/api/auth/google";
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Please try again.");
    }
  };


  
  const handleLogin = async (e)=>{
    e.preventDefault();
    setError(" ")
    setSuccess(" ")
    if (!email || !password){
      return(setError("Email and password are required"));
    }
    try{
      const url = "http://localhost:8080/api/auth/login"
      const response = await fetch(url,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
      });
      const result = await response.json();
      const {success, message,jwtToken, username, error} = result;
      if(success){
        setSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('email', email);
        login();
        setTimeout(() =>{
          router.replace('/notes')
        },1000)
      }
      else if(error){
        const details = error.details[0].message;
        setError(details);
      } else if (!success){
        setError(message);
      }
      console.log(result);
    
    }catch(err){
      setError(err);
    }
  }
    

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="bg-black">
        <Navbar />
      </div>
      <div className="flex flex-grow items-center justify-center bg-sign">
        <div className="relative w-full max-w-md p-8 bg-sign rounded shadow-lg">
          
          <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-100 rounded-bl-md shadow-md" style={{ transform: 'rotate(45deg)', transformOrigin: 'top right' }}></div>

          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          <div className="flex justify-between mb-6">
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign in with Facebook"
              onClick={() => console.log('Sign in with Facebook')}
            >
              <FaFacebookF className="mx-auto" />
            </button>
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign in with Google"
              onClick={handleGoogle}
            >
              <FaGoogle className="mx-auto" />
            </button>
            <button
              type="button"
              className="w-full p-2 mx-1 rounded-full bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
              aria-label="Sign in with Apple"
              onClick={() => console.log('Sign in with Apple')}
            >
              <FaApple className="mx-auto" />
            </button>
          </div>

          <form>
          
          {error && <p className="text-red-600 mb-4 text-center"> {error}</p>}
          {success && <p className="text-green-600 mb-4 text-center"> {success}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-normal mb-2">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-white">
            Don't have an account? <a href="signup" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
