// 'use client';

// import { useChat } from 'ai/react';
// import Link from 'next/link';

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();

//   return (
//     <div>
//       <Link
//         href="/"
//         className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
//         Back
//       </Link>

//       {messages.map((m) => (
//         <div key={m.id}>
//           {m.role === 'user' ? 'Sen: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//           className="bg-orange-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-2"
//         />
//         <input
//           type="submit"
//           value="Gönder"
//           onClick={handleSubmit}
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-5 my-2"
//         />
//       </form>
//     </div>
//   );
// }

'use client';

import { useChat } from 'ai/react';
import Link from 'next/link';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link
        href="/"
        className="absolute top-8 left-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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

      <div className="bg-green-200 border border-gray-300 rounded-lg p-4 w-full max-w-md">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <strong>{m.role === 'user' ? 'Sen: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className="bg-orange-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xs p-2.5 my-2"
            style={{ width: '300px' }} // Set a fixed width for the input field
          />
          <input
            type="submit"
            value="Gönder"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-5 my-2"
          />
        </form>
      </div>
    </div>
  );
}
