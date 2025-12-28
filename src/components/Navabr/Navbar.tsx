'use client';
import Link from 'next/link';
import { ModeToggle } from '@/components/DarkModeToggle/mode-toggle';
import { useState, useEffect } from 'react';
import { FolderHeart } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  interface Navlink {
    id: number;
    title: string;
    url: string;
  }

  const navlink: Navlink[] = [
    {
      id: 1,
      title: 'Home',
      url: '/',
    },
    {
      id: 2,
      title: 'Explore',
      url: '/explore',
    },
    {
      id: 3,
      title: 'About',
      url: '/about',
    },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b light:border-gray-300 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 relative transition-all">
      <Link href="/">
        <h3 className="text-2xl font-semibold tracking-wider text-neutral-800 dark:text-gray-100">
          SuperPoke
        </h3>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {navlink.map((item) => (
          <Link key={item.id} href={item.url}>
            {item.title}
          </Link>
        ))}

        {/* search bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-neutral-800 dark:border-gray-200 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none dark:placeholder-gray-200 placeholder-neutral-800"
            type="text"
            placeholder="Search Here"
          />
          {/* magnifying glass icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* bookmark icon */}
        <div className="relative cursor-pointer">
          <FolderHeart />
        </div>

        <div>
          <ModeToggle />
        </div>

        <button className="cursor-pointer px-8 py-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-gray-100 dark:hover:bg-gray-200 transition text-white dark:text-neutral-800 rounded-full">
          Login
        </button>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#404040" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#404040" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#404040" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-gray-50 dark:bg-neutral-950 shadow-xl px-5 py-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-neutral-800 dark:border-gray-200 px-3 rounded-full">
              <input
                className="py-1.5 w-full bg-transparent outline-none"
                type="text"
                placeholder="Search Here"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative cursor-pointer">
                <FolderHeart />
              </div>
              <div>
                <ModeToggle />
              </div>
            </div>

            {/* Links */}
            {navlink.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="py-2 text-base"
              >
                {item.title}
              </Link>
            ))}

            {/* Actions */}
            <button className="mt-auto px-6 py-3 bg-neutral-950 dark:bg-gray-100 text-white dark:text-neutral-800 rounded-full">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
