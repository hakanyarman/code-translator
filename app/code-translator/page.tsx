'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs, xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
import clsx from 'clsx';

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
  const [showHistoryNotification, setShowHistoryNotification] = useState(false);
  const [includeComments, setIncludeComments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<
    TranslationHistoryItem[]
  >([]);

  const [showEmptyHistoryNotification, setShowEmptyHistoryNotification] =
    useState(false);
  const [copiedItemTimestamp, setCopiedItemTimestamp] = useState<number | null>(
    null
  );
  const [showScrollButton, setShowScrollButton] = useState(false);

  const eyeOffSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-eye-off "
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  const eyeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-eye "
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleCopyHistory = (historyItem: TranslationHistoryItem) => {
    navigator.clipboard.writeText(historyItem.translatedCode);
    setShowHistoryNotification(true);
    setCopiedItemTimestamp(historyItem.timestamp);
    setTimeout(() => {
      setShowHistoryNotification(false);
      setCopiedItemTimestamp(null);
    }, 2000);
  };

  const deleteInputCode = () => {
    setCode('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
    if (!showHistory) {
      setTimeout(scrollToBottom, 100);
    }
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
    <div className="container mx-auto p-4 relative pb-16">
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
        <div>
          <h2 className="text-blue-900 text-2xl font-bold">Code Translator</h2>
        </div>
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center items-center"
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
          <span className="mx-1 h-3.5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-code "
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </span>
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
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-copy"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </span>
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
        className={clsx(
          'text-white hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-3 flex justify-center',
          showHistory ? 'bg-red-400' : 'bg-lime-500'
        )}
        onClick={toggleHistory}
      >
        <span className="mr-2"> {showHistory ? eyeOffSvg : eyeSvg}</span>
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
              <pre className="relative bg-white  rounded mt-1">
                <SyntaxHighlighter
                  language={getLanguage(targetLanguage)}
                  style={xonokai}
                  showLineNumbers={true}
                >
                  {item.translatedCode}
                </SyntaxHighlighter>
                <button
                  onClick={() => handleCopyHistory(item)}
                  className="absolute end-2 top-2 text-white "
                >
                  <span id="default-icon ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-copy"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </span>
                </button>
                {showHistoryNotification &&
                  copiedItemTimestamp === item.timestamp && (
                    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-2 py-2 rounded-lg shadow-lg z-50 text-xs">
                      Code translation dated{' '}
                      {new Date(item.timestamp).toLocaleString()} is copied
                    </div>
                  )}
              </pre>
              <p className="text-sm text-gray-500 mt-2">
                Translation Date: {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {translationHistory.length > 0 && (
            <>
              <hr></hr>
              <button
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 mt-2"
                onClick={() => setTranslationHistory([])}
              >
                Remove History
              </button>
            </>
          )}
        </div>
      )}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 z-10 transition-opacity duration-300"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v13m0-13 4 4m-4-4-4 4"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
