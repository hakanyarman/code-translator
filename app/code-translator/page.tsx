'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

import { createClient } from '@/utils/supabase/server';

import { redirect } from 'next/navigation';
import AuthButton from '@/components/AuthButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TranslationHistoryItem {
  originalCode: string;
  translatedCode: string;
  targetLanguage: string;
  timestamp: number;
}

export default function CodeTranslator() {
  const [code, setCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [translatedCode, setTranslatedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [includeComments, setIncludeComments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<
    TranslationHistoryItem[]
  >([]);

  const [showEmptyHistoryNotification, setShowEmptyHistoryNotification] =
    useState(false);

  useEffect(() => {
    if (showHistory && translationHistory.length === 0) {
      setShowEmptyHistoryNotification(true);
      const timer = setTimeout(() => {
        setShowEmptyHistoryNotification(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showHistory, translationHistory.length]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('translationHistory');
    if (storedHistory) {
      setTranslationHistory(JSON.parse(storedHistory));
    }
  }, []);
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
        body: JSON.stringify({ code, targetLanguage, includeComments }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Yanıtı JSON olarak al
      console.log('Response data:', data);

      // response.content[0].text varsayımı yaparak çevirisi yapılmış kodu al
      setTranslatedCode(data.text || ''); // Yanıt yapısına göre `text` alanını kontrol edin

      const newHistoryItem: TranslationHistoryItem = {
        originalCode: code,
        translatedCode: data.text,
        targetLanguage,
        timestamp: Date.now(),
      };

      const updatedHistory = [newHistoryItem, ...translationHistory].slice(
        0,
        5
      );
      setTranslationHistory(updatedHistory);
      localStorage.setItem(
        'translationHistory',
        JSON.stringify(updatedHistory)
      );
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

  const deleteInputCode = () => {
    setCode('');
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
      <div className="flex items-center mb-4 ">
        <Link
          href="/"
          className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm bg-neutral-300 mr-4 dark:bg-zinc-400"
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
          </svg>
          Back
        </Link>
        <h2 className="text-blue-900 text-2xl font-bold">Code Translator</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-6 pt-4 ">
          <label
            htmlFor="code"
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          >
            Enter Code:
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-600 block w-full p-2.5 h-48 shadow-2xl shadow-indigo-500/40  border border-gray-300"
            required
          ></textarea>
        </div>
        <button
          onClick={deleteInputCode}
          className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 mt-1 mb-2"
        >
          Clear Code
        </button>
        <div className="mb-4">
          <label
            htmlFor="targetLanguage"
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
          >
            Target Language:
          </label>
          <Select
            value={targetLanguage}
            onValueChange={setTargetLanguage}
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
          <div className="mt-3">
            <label>
              <input
                type="checkbox"
                checked={includeComments}
                onChange={(e) => setIncludeComments(e.target.checked)}
                className="mr-2"
              />
              Add descriptive comment lines in target code
            </label>
          </div>
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
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
            Translated Code:
          </h2>

          <div className="shadow-2xl shadow-indigo-500/40 bg-red-50 border border-gray-300 rounded-md relative">
            <SyntaxHighlighter
              language={getLanguage(targetLanguage)}
              style={solarizedlight}
              showLineNumbers={true}
            >
              {translatedCode}
            </SyntaxHighlighter>
            <button
              onClick={handleCopy}
              className="absolute end-2 top-2  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
            >
              <span id="default-icon">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              </span>
              copy
            </button>
          </div>

          {showNotification && (
            <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Copied to clipboard!
            </div>
          )}
        </div>
      )}

      <button
        className="text-white bg-purple-500		 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-3 "
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide ' : 'Show '}
        Code History
      </button>
      {showHistory && (
        <div className="code-history mt-4">
          {translationHistory.length > 0
            ? ''
            : showEmptyHistoryNotification && (
                <p className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  There is no code history yet. Start translating to build your
                  history
                </p>
              )}
          {translationHistory.map((item, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold">
                Original Code (translated to {item.targetLanguage}):
              </h3>
              <pre className="bg-white p-2 rounded mt-1 mb-2">
                {item.originalCode}
              </pre>
              <h3 className="font-bold">Translated Code:</h3>
              <pre className="bg-white  rounded mt-1">
                <SyntaxHighlighter
                  language={getLanguage(targetLanguage)}
                  style={dracula}
                  showLineNumbers={true}
                >
                  {item.translatedCode}
                </SyntaxHighlighter>
              </pre>
              <p className="text-sm text-gray-500 mt-2">
                Translation Date: {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          {translationHistory.length > 0 && (
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 mt-2"
              onClick={() => setTranslationHistory([])}
            >
              Remove History
            </button>
          )}
        </div>
      )}
    </div>
  );
}
