import React from 'react';

interface HeaderProps {
  onNavigateToSavedProducts: () => void;
  onNavigateHome: () => void;
}

const DocumentTextIcon = () => ( // Simple icon for branding
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);


export const Header: React.FC<HeaderProps> = ({ onNavigateToSavedProducts, onNavigateHome }) => {
  return (
    <header className="bg-white p-4 shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
          onKeyDown={(e) => e.key === 'Enter' && onNavigateHome()}
        >
          <DocumentTextIcon />
          <h1 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Digital Product Generator
          </h1>
        </div>
        <nav>
          <button
            onClick={onNavigateToSavedProducts}
            className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-md text-sm transition-colors"
            aria-label="View saved products"
          >
            My Saved Products
          </button>
        </nav>
      </div>
    </header>
  );
};