import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import { ShowPasswordToggle } from './ShowPasswordToggle';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; redirect?: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();
    const redirectUrl = searchParams.redirect || '/code-translator'; // Default to /code-translator if no redirect is specified

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // console.error('Sign In Error:', error); // Log the error details for debugging

      if (error.code === 'auth/invalid-email') {
        return redirect(`/login?message=Invalid email address.`);
      } else if (error.code === 'auth/invalid-password') {
        return redirect(`/login?message=Incorrect password. Please try again.`);
      } else {
        return redirect(
          `/login?message=Could not authenticate user. Please check your credentials and try again.`
        );
      }
    }

    return redirect(redirectUrl);
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      // console.error('Sign Up Error:', error); // Log the error details for debugging

      if (error.code === 'auth/email-already-exists') {
        return redirect(
          `/login?message=Email already registered. Please sign in.`
        );
      } else if (error.code === 'over_email_send_rate_limit') {
        return redirect(
          `/login?message=Too many sign-up attempts. Please try again later.`
        );
      } else {
        return redirect(
          `/login?message=Could not sign up user. Please try again.`
        );
      }
    }

    return redirect(`/login?message=Check email to continue sign in process`);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm bg-neutral-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground ">
        <h2 className="text-center text-2xl bg-gray-100 dark:text-slate-800">
          Login To Translate Code
        </h2>
        <label
          className="text-md text-neutral-950 dark:text-white"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="email-input rounded-md px-4 py-2 bg-inherit border mb-6 dark:bg-white text-neutral-950"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label
          className="text-md text-neutral-950 dark:text-white"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <ShowPasswordToggle />
        </div>

        <SubmitButton
          formAction={signIn}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
