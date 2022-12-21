import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

interface INavbarProps {}

type Link = {
  id: number;
  url: string;
  title: string;
};

const links: Link[] = [
  {
    id: 0,
    url: '/',
    title: 'Trang chủ',
  },
  {
    id: 1,
    url: '/about',
    title: 'Giới thiệu',
  },
  {
    id: 2,
    url: '/foods',
    title: 'Món ăn',
  },
  {
    id: 3,
    url: '/categories',
    title: 'Danh mục',
  },
];

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const { asPath } = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between w-full py-3 px-14 border-b-full gap-x-10">
        <div>
          <Image
            src="/main-logo.png"
            width={70}
            height={70}
            alt="main-logo"
            className="m-0"
          />
        </div>
        <nav className="flex items-center justify-end flex-1">
          {links.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={`px-8 py-2 text-lg font-medium ${
                asPath === link.url &&
                'after:content-[""] after:w-full after:h-1 after:bg-primary after:block after:rounded-full'
              }`}
            >
              <span className="drop-shadow-center">{link.title}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-x-10">
          <div className="p-5 rounded-full shadow-cart">
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
          <div className="flex overflow-visible">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-full shadow-login bg-primary"
            >
              <span className="text-lg font-medium text-white">Đăng nhập</span>
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 text-lg font-medium drop-shadow-center"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
