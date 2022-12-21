import Image from 'next/image';
import * as React from 'react';

interface IFoodCardProps {
  url: string;
  title: string;
  description: string;
  price: number;
}

const FoodCard: React.FunctionComponent<IFoodCardProps> = ({
  url,
  title,
  description,
  price,
}) => {
  return (
    <div className="p-4 pt-0 mt-24 mb-6 rounded-[2.3rem] shadow-lg w-60 relative">
      <div className="h-24 mx-auto mb-8 -translate-y-24 rounded-2xl">
        <Image
          src={url}
          alt="best-food image"
          width={1000}
          height={1000}
          className="object-cover mx-auto w-52 h-52"
        />
      </div>
      <div className="flex flex-col p-2 gap-y-2">
        <span className="text-lg font-semibold truncate">{title}</span>
        <span className="truncate">{description}</span>
        <span className="font-semibold">
          {Intl.NumberFormat('vn-VN').format(price)} VND
        </span>
      </div>
      <div className="absolute bottom-0 inline-block p-3 text-white translate-y-6 rounded-full right-5 bg-dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default FoodCard;
