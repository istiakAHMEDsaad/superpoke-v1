'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/explore',
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      window.location.href = '/explore';
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <form
        onSubmit={handleLogin}
        className="border border-gray-300 dark:bg-gray-100 bg-gray-50
         text-gray-500 max-w-87.5 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mb-3 bg-neutral-950 hover:bg-neutral-900 active:scale-95 transition py-2.5 rounded-full text-white cursor-pointer"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <p className="text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-500 underline">
            Signup Now
          </Link>
        </p>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/explore' })}
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 hover:bg-gray-200/60"
        >
          <Image
            height={16}
            width={16}
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="google"
          />
          Log in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
