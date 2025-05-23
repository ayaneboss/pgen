import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyle =
    'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-150 ease-in-out flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400', // Notion-like blue
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white focus:ring-gray-600', // Darker secondary
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-300',
    subtle: 'bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-blue-300',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {icon && <span className={`mr-2 ${children ? '' : 'mr-0'}`}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};