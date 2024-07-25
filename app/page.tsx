import { useState } from 'react'; //

import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';
import IconCloud from '@/components/magicui/icon-cloud';

import { Button } from '@/components/ui/button';

// import { useChat } from 'ai/react';

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   return (
//     <div>
//       {messages.map((m) => (
//         <div key={m.id}>
//           {m.role === 'user' ? 'User: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }
//

export default async function Index() {
  const slugs = [
    'typescript',
    'javascript',
    'dart',
    'java',
    'react',
    'flutter',
    'android',
    'html5',
    'css3',
    'nodedotjs',
    'express',
    'nextdotjs',
    'prisma',
    'amazonaws',
    'postgresql',
    'firebase',
    'nginx',
    'vercel',
    'testinglibrary',
    'jest',
    'cypress',
    'docker',
    'git',
    'jira',
    'github',
    'gitlab',
    'visualstudiocode',
    'androidstudio',
    'sonarqube',
    'figma',
  ];

  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex-row  border-b border-b-foreground/10 h-16 bg-red-50 border border-gray-300">
        <div className="w-70 max-w-4xl flex justify-between items-center p-3 text-sm basis-1/4">
          {isSupabaseConnected && <AuthButton />}
        </div>

        <Link
          href="/code-translator"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mx-2 shadow-2xl"
        >
          Translate Code
        </Link>
        <Link
          href="/chat"
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Chat With AI
        </Link>
      </nav>
      <div className="flex-1 flex flex-col max-w-4xl px-3">
        <Header />

        <main className="flex-1 items-center flex flex-col gap-6">
          <div className="relative flex h-full w-full max-w-[25rem] items-center justify-center overflow-hidden  bg-background px-20 pb-20 pt-2 absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:14px_14px] ">
            <IconCloud iconSlugs={slugs} />
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p className="text-neutral-950 font-semibold">
          © {new Date().getFullYear()} Code Translator
        </p>
      </footer>
    </div>
  );
}
