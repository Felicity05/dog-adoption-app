import React from 'react';

export const ErrorPage: React.FC = () => {
   return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
         <div className="text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
            <p className="mt-2 text-gray-600">The page you’re looking for doesn’t seem to exist.</p>
            <a
               href="/"
               className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
               Go Back Home
            </a>
         </div>
      </div>
   );
};
