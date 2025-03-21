import React from "react";
import "tailwindcss/tailwind.css";

export default function NetflixLogin() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-black bg-opacity-80 p-10 rounded-md w-96 text-white">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form>
          <input
            type="email"
            placeholder="Email or phone number"
            className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-md outline-none text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-800 border border-gray-700 rounded-md outline-none text-white"
          />
          <button className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-md font-semibold">
            Sign In
          </button>
        </form>
        <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="hover:underline">Need help?</a>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          New to Netflix? <a href="#" className="text-white hover:underline">Sign up now.</a>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. 
          <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
        </p>
        <div className="mt-6 text-center">
          <a href="#" className="text-gray-400 hover:text-white text-sm">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
}
