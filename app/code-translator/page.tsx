'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// export function ModeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme('light')}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('dark')}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme('system')}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

export default function CodeTranslator() {
  const [code, setCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTranslatedCode('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, targetLanguage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Yanıtı JSON olarak al
      console.log('Response data:', data);

      // response.content[0].text varsayımı yaparak çevirisi yapılmış kodu al
      setTranslatedCode(data.text || ''); // Yanıt yapısına göre `text` alanını kontrol edin
    } catch (error) {
      console.error('Error:', error);
      // Hata mesajı işleme
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedCode);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };

  const getLanguage = (language: string) => {
    switch (language) {
      case 'Python':
        return 'python';
      case 'JavaScript':
        return 'javascript';
      case 'Java':
        return 'java';
      case 'C++':
        return 'cpp';
      case 'C#':
        return 'csharp';
      case 'Ruby':
        return 'ruby';
      case 'Go':
        return 'go';
      case 'PHP':
        return 'php';
      default:
        return 'text';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* {ModeToggle()} */}
      <div className="grid grid-cols-2 gap-4 place-content-center h-48">
        <h1 className="text-2xl font-bold mb-4 text-neutral-950">
          Code Translator
        </h1>
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Code:
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="targetLanguage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Target Language:
          </label>
          {/* <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
            <option value="PHP">PHP</option>
          </select> */}
          <Select
            value={targetLanguage}
            onValueChange={setTargetLanguage}
            //@ts-ignore
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
              <SelectItem value="C++">C++</SelectItem>
              <SelectItem value="C#">C#</SelectItem>
              <SelectItem value="Ruby">Ruby</SelectItem>
              <SelectItem value="Go">Go</SelectItem>
              <SelectItem value="PHP">PHP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {translatedCode && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2 text-black">
            Translated Code:
          </h2>
          <SyntaxHighlighter
            language={getLanguage(targetLanguage)}
            style={solarizedlight}
            showLineNumbers={true}
          >
            {translatedCode}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 mt-2"
          >
            Copy
          </button>
          {showNotification && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Copied to clipboard!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
