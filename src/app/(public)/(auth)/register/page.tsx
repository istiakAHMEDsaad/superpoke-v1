'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <form
        onSubmit={handleRegister}
        className="border border-gray-300 dark:bg-gray-100 bg-gray-50
        text-gray-500 max-w-87.5 mx-4 md:p-6 p-4 text-left text-sm
        rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Create Account
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {success && (
          <p className="text-green-600 text-center mb-3">{success}</p>
        )}

        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        />

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
          placeholder="Create a password"
          required
          minLength={6}
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 mb-6"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mb-3 bg-neutral-950 hover:bg-neutral-900 active:scale-95 transition py-2.5 rounded-full text-white cursor-pointer"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

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
          Signup with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
