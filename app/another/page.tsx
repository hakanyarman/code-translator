import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
// import Header from '@/components/Header';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AnotherProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-blue-950 text-center">
          This is another protected page that you can only see as an
          authenticated user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
            <Link
              href="/"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Home Page
            </Link>
          </div>
        </nav>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Code Translator</p>
      </footer>
    </div>
  );
}
