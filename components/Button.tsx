import Link from 'next/link';
import React from 'react';

interface IButtonProps {
  to?: string;
  children?: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  loading?: boolean;
  color?: string;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  to,
  children,
  type = 'button',
  className = '',
  loading = false,
  color = 'bg-primary',
}: IButtonProps): any => {
  if (to) {
    return (
      <Link
        href={to}
        className={`block overflow-hidden rounded-lg ${className}`}
      >
        <button
          type={type}
          className={`w-[175px] h-[54px] flex justify-center items-center text-white font-medium  ${
            loading ? 'opacity-75' : 'opacity-100'
          } ${color}`}
        >
          {!loading ? (
            children
          ) : (
            <span className="inline-block border-[3px] border-t-transparent border-white rounded-full w-9 h-9 animate-spin"></span>
          )}
        </button>
      </Link>
    );
  } else {
    return (
      <div className={`block overflow-hidden rounded-lg ${className}`}>
        <button
          type={type}
          className={`w-[200px] h-[54px] flex justify-center items-center text-white font-medium  ${
            loading ? 'opacity-75' : 'opacity-100'
          } ${color}`}
        >
          {!loading ? (
            children
          ) : (
            <span className="inline-block border-[3px] border-t-transparent border-white rounded-full w-9 h-9 animate-spin"></span>
          )}
        </button>
      </div>
    );
  }
};

export default Button;
