import { useState } from 'react'; //

import DeployButton from '../components/DeployButton';
import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import ConnectSupabaseSteps from '@/components/tutorial/ConnectSupabaseSteps';
import SignUpUserSteps from '@/components/tutorial/SignUpUserSteps';
import Header from '@/components/Header';
import Link from 'next/link';

//
// import { useChat } from 'ai/react';
//

//
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
  //

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    // eski ana sayfa
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex-row  border-b border-b-foreground/10 h-16 bg-red-50 border border-gray-300">
        <div className="w-70 max-w-4xl flex justify-between items-center p-3 text-sm basis-1/4">
          {isSupabaseConnected && <AuthButton />}

          {/* <DeployButton /> */}
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
        <main className="flex-1 flex flex-col gap-6">
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
          {/* <p>databaseden bu sayfaya veri çekmeyi dene.</p> */}
        </main>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{''}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>

    //

    //

    // protected sayfası asıl translate işlemi
    // <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //   <div className="w-full">
    //     <div className="py-6 font-bold bg-blue-950 text-center">
    //       This is a protected page that you can only see as an authenticated
    //       user
    //     </div>
    //     <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //       <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //         <AuthButton />

    //         {/* <Link
    //           href="/"
    //           className="focus:outline-none text-white bg-purple-700
    //           hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium
    //           rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600
    //           dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    //         >
    //           Home Page
    //         </Link> */}
    //       </div>
    //     </nav>
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //       <Link
    //         href="/"
    //         className="rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           stroke="currentColor"
    //           strokeWidth="2"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //         >
    //           <polyline points="15 18 9 12 15 6" />
    //         </svg>{' '}
    //         Home Page
    //       </Link>
    //     </div>
    //   </div>
    //   {/* <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
    //     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //       Your message
    //     </label>
    //     <textarea
    //       id="message"
    //       rows={15}
    //       className="block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Write your thoughts here..."
    //     ></textarea>
    //   </div> */}
    //   <div className="flex-1 flex flex-col gap-20 max-w-4xl px-1">
    //     {/* <form className="max-w-sm mx-auto">
    //       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //         Select an option
    //       </label>
    //       <select
    //         id="countries"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       >
    //         <option selected>Choose a country</option>
    //         <option value="US">United States</option>
    //         <option value="CA">Canada</option>
    //         <option value="FR">France</option>
    //         <option value="DE">Germany</option>
    //       </select>
    //     </form> */}
    //     <form className="max-w-lg mx-auto">
    //       <div className="flex space-x-4">
    //         <div className="w-full">
    //           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //             Input Code Language
    //           </label>
    //           <select
    //             id="countries1"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           >
    //             <option selected>Choose Input Language</option>
    //             <option value="Javascript">Javascript</option>
    //             <option value="Python">Python</option>
    //             <option value="Java">Java</option>
    //             <option value="C#">C#</option>
    //           </select>
    //         </div>
    //         <div className="w-full">
    //           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //             Output Code Language
    //           </label>
    //           <select
    //             id="countries2"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           >
    //             <option selected>Choose Output Language</option>
    //             <option value="Javascript">Javascript</option>
    //             <option value="Python">Python</option>
    //             <option value="Java">Java</option>
    //             <option value="C#">C#</option>
    //           </select>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    //   <div className="flex space-x-4">
    //     <div>
    //       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //         Input Code
    //       </label>
    //       <textarea
    //         id="message1"
    //         rows={8}
    //         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
    //         placeholder="Write your input codes here..."
    //       ></textarea>
    //     </div>
    //     <div>
    //       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //         Output Code
    //       </label>
    //       <textarea
    //         disabled
    //         id="message2"
    //         rows={8}
    //         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
    //         placeholder="Your Output Codes..."
    //       >
    //         Output Codes Readonly
    //       </textarea>
    //     </div>
    //   </div>
    //   <div>
    //     <button
    //       type="button"
    //       className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    //     >
    //       Translate Code
    //     </button>
    //   </div>
    //   <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
    //     <p>
    //       Powered by{' '}
    //       <a
    //         href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
    //         target="_blank"
    //         className="font-bold hover:underline"
    //         rel="noreferrer"
    //       >
    //         Supabase
    //       </a>
    //     </p>
    //   </footer>
    // </div>
  );
}

// 'use client';
// import { useState } from 'react';

// export default function Home() {
//   const [code, setCode] = useState('');
//   const [targetLanguage, setTargetLanguage] = useState('');
//   const [translatedCode, setTranslatedCode] = useState('');

//   const handleTranslate = async () => {
//     const response = await fetch('/api/tryapi', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code, targetLanguage }),
//     });

//     const data = await response.json();
//     if (data.translatedCode) {
//       setTranslatedCode(data.translatedCode);
//     } else {
//       console.error(data.error);
//     }
//   };

//   return (
//     <div>
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         placeholder="Enter your code"
//       />
//       <input
//         value={targetLanguage}
//         onChange={(e) => setTargetLanguage(e.target.value)}
//         placeholder="Target Language"
//       />
//       <button onClick={handleTranslate}>Translate</button>
//       <pre>{translatedCode}</pre>
//     </div>
//   );
// }
