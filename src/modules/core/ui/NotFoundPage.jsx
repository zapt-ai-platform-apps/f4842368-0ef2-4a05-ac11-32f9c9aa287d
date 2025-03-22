import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary inline-block">
        Go Back Home
      </Link>
    </div>
  );
}