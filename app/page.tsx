import { useState } from 'react'; //

import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Link from 'next/link';

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
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-100 h-100 mt-2  basis-1/4 mx-2"
        >
          Translate Code
        </Link>
        <Link
          href="/chat"
          className="text-gray-900 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-100 h-100 mt-2 basis-1/4"
        >
          Chat With AI
        </Link>
      </nav>
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6"></main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p className="text-neutral-950">
          Powered by{''}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline "
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
