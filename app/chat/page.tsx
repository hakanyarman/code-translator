'use client';
// wrg
import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import Link from 'next/link';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link
        href="/"
        className="absolute top-8 left-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm bg-neutral-300"
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
      <h2 className="text-blue-900 text-2xl font-bold dark:text-white">
        Chat with AI
      </h2>

      <div className="bg-green-100 border border-gray-300 rounded-lg p-4 w-full max-w-md flex flex-col h-full max-h-96 mt-6 shadow-2xl shadow-indigo-500/40 bg-red-50 border border-gray-300">
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((m) => (
            <div key={m.id} className="mb-2 text-slate-950">
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              {m.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className="bg-orange-50 border border-gray-300 text-gray-900 text-sm text-neutral-950 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            style={{ width: '300px' }}
          />

          <input
            type="submit"
            value="Send"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-auto"
          />
        </form>
      </div>
    </div>
  );
}
