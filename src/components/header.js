import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-middle cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.HOMEPAGE}>
                <span>Covid Dashboard</span>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-middle">
            <Link
              to={ROUTES.HOMEPAGE}
              aria-label="Dashboard"
              className="h-6/12 mx-auto px-2 align-middle black-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
