import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ICategoryCardProps {
  url: string;
  title: string;
}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = ({
  url,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Image
          src={url}
          alt="category image"
          width={1000}
          height={1000}
          className="object-cover rounded-full w-60 h-60"
        />
      </div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <Link
        href="/"
        className="flex items-center gap-1 text-base font-medium text-secondary"
      >
        <span>Chọn món</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Link>
    </div>
  );
};

export default CategoryCard;
