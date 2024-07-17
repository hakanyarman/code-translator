import NextLogo from './NextLogo';
import SupabaseLogo from './SupabaseLogo';

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a> */}
        {/* <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a> */}
        <h2 className="text-blue-600 text-xl">Code Translator App</h2>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <div className="shadow-md shadow-indigo-500/40">
        <p className="text-3xl lg:text-xl !leading-tight mx-auto max-w-xl text-center ">
          {/* The fastest way to build apps with{" "} */}
          Easily and reliably convert your code from one programming language to
          another! Our application supports code translations between{' '}
          <a className="underline decoration-pink-500 decoration-dashed decoration-2">
            Python
          </a>{' '}
          ,
          <a className="underline decoration-sky-500 decoration-dashed decoration-2">
            Javascript
          </a>
          ,{' '}
          <a className="underline decoration-indigo-500 decoration-dashed decoration-2">
            Java
          </a>
          ,{' '}
          <a className="underline decoration-orange-500 decoration-dashed decoration-2">
            C#
          </a>
          , and many more.
        </p>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
