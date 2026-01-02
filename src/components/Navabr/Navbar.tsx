'use client';

import Link from 'next/link';
import { ModeToggle } from '@/components/DarkModeToggle/mode-toggle';
import { useState, useEffect } from 'react';
import { FolderHeart } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { DropDownMenu } from './DropDownMenu';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  interface Navlink {
    id: number;
    title: string;
    url: string;
  }

  const navlink: Navlink[] = [
    { id: 1, title: 'Home', url: '/' },
    { id: 2, title: 'Explore', url: '/explore' },
    { id: 3, title: 'About', url: '/about' },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b light:border-gray-300 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950 relative transition-all">
      {/* Logo */}
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

        {/* Bookmark */}
        <Link href="/bookmark" className="relative cursor-pointer">
          <FolderHeart className="" />
          <button className="absolute -bottom-1 -right-1 text-xs text-white bg-red-500 w-4.5 h-4.5 rounded-full cursor-pointer">
            3
          </button>
        </Link>

        <ModeToggle />

        {/* AUTH UI */}
        {status === 'loading' ? null : !session ? (
          <Link
            href="/login"
            className="px-8 py-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-gray-100 dark:hover:bg-gray-200 transition text-white dark:text-neutral-800 rounded-full"
          >
            Login
          </Link>
        ) : (
          <DropDownMenu
            name={session.user.name || 'User'}
            imageUrl={session.user.image || undefined}
            onLogout={() => signOut({ callbackUrl: '/' })}
          />
        )}
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <Menu />

        {/* ☰ */}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-gray-50 dark:bg-neutral-950 shadow-xl px-5 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {navlink.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {item.title}
              </Link>
            ))}

            <div className="flex items-center gap-2">
              <Link href="/bookmark" className="relative cursor-pointer">
                <FolderHeart className="" />
                <button className="absolute -bottom-1 -right-1 text-xs text-white bg-red-500 w-4.5 h-4.5 rounded-full cursor-pointer">
                  3
                </button>
              </Link>
              <ModeToggle />
            </div>

            <div className="mt-auto">
              {!session ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block text-center px-6 py-3 bg-neutral-950 dark:bg-gray-100 text-white dark:text-neutral-800 rounded-full"
                >
                  Login
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
