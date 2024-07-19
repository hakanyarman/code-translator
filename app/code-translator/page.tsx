// // 'use client';

// // import { useState } from 'react';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const data = await response.json();
// //     setTranslatedCode(data.result);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //         >
// //           Translate
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useState } from 'react';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const reader = response.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let result = '';

// //     while (true) {
// //       const { done, value } = await reader?.read()!;
// //       if (done) break;
// //       result += decoder.decode(value, { stream: true });
// //     }

// //     setTranslatedCode(result);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //             required
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //           disabled={loading}
// //         >
// //           {loading ? 'Translating...' : 'Translate'}
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useState } from 'react';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setTranslatedCode('');

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const reader = response.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let result = '';

// //     while (true) {
// //       const { done, value } = await reader?.read()!;
// //       if (done) break;
// //       result += decoder.decode(value, { stream: true });
// //     }

// //     // Remove any newline characters and join the parts together
// //     const finalTranslatedCode = result.replace(/\n/g, '').trim();

// //     setTranslatedCode(finalTranslatedCode);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //             required
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //           disabled={loading}
// //         >
// //           {loading ? 'Translating...' : 'Translate'}
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useState } from 'react';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setTranslatedCode('');

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const reader = response.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let result = '';

// //     while (true) {
// //       const { done, value } = await reader?.read()!;
// //       if (done) break;
// //       result += decoder.decode(value, { stream: true });
// //     }

// //     // Parse and clean up the result to remove unwanted characters
// //     let cleanResult = '';
// //     try {
// //       cleanResult = JSON.parse(result).join('');
// //     } catch (e) {
// //       cleanResult = result;
// //     }

// //     cleanResult = cleanResult.replace(/0:/g, '').replace(/"/g, '').trim();

// //     setTranslatedCode(cleanResult);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //             required
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //           disabled={loading}
// //         >
// //           {loading ? 'Translating...' : 'Translate'}
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useState } from 'react';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setTranslatedCode('');

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const reader = response.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let result = '';

// //     while (true) {
// //       const { done, value } = await reader?.read()!;
// //       if (done) break;
// //       result += decoder.decode(value, { stream: true });
// //     }

// //     // Clean up the result to remove unwanted characters and properly join lines
// //     let cleanResult = result
// //       .replace(/\n+/g, ' ')
// //       .replace(/\\n/g, '\n')
// //       .replace(/\\/g, '');
// //     cleanResult = cleanResult.replace(/["']/g, '').trim();

// //     setTranslatedCode(cleanResult);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       {translatedCode}
// //       <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //             required
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //           disabled={loading}
// //         >
// //           {loading ? 'Translating...' : 'Translate'}
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useState } from 'react';
// // import { createClient } from '@/utils/supabase/server';
// // import { redirect } from 'next/navigation';
// // import Link from 'next/link';

// // export default function CodeTranslator() {
// //   const [code, setCode] = useState('');
// //   const [targetLanguage, setTargetLanguage] = useState('Python');
// //   const [translatedCode, setTranslatedCode] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setTranslatedCode('');

// //     const response = await fetch('/api/translate', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({ code, targetLanguage }),
// //     });

// //     const reader = response.body?.getReader();
// //     const decoder = new TextDecoder();
// //     let result = '';

// //     while (true) {
// //       const { done, value } = await reader?.read()!;
// //       if (done) break;
// //       result += decoder.decode(value, { stream: true });
// //     }

// //     // Clean up the result to remove unwanted characters and properly join lines
// //     let cleanResult = result
// //       .replace(/(?:0:|\\n)+/g, '')
// //       .replace(/\s\s+/g, ' ')
// //       .replace(/["']/g, '')
// //       .trim();

// //     setTranslatedCode(cleanResult);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <div className="grid grid-cols-2 gap-4 place-content-center h-48">
// //         <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
// //         <Link
// //           href="/"
// //           className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
// //         >
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             width="24"
// //             height="24"
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="2"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
// //           >
// //             <polyline points="15 18 9 12 15 6" />
// //           </svg>{' '}
// //           Back
// //         </Link>
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <div className="mb-4">
// //           <label
// //             htmlFor="code"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Enter Code:
// //           </label>
// //           <textarea
// //             id="code"
// //             value={code}
// //             onChange={(e) => setCode(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
// //             required
// //           ></textarea>
// //         </div>

// //         <div className="mb-4">
// //           <label
// //             htmlFor="targetLanguage"
// //             className="block text-gray-700 text-sm font-bold mb-2"
// //           >
// //             Target Language:
// //           </label>
// //           <select
// //             id="targetLanguage"
// //             value={targetLanguage}
// //             onChange={(e) => setTargetLanguage(e.target.value)}
// //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
// //             required
// //           >
// //             <option value="Python">Python</option>
// //             <option value="JavaScript">JavaScript</option>
// //             <option value="Java">Java</option>
// //             <option value="C++">C++</option>
// //             <option value="C#">C#</option>
// //             <option value="Ruby">Ruby</option>
// //             <option value="Go">Go</option>
// //             <option value="PHP">PHP</option>
// //           </select>
// //         </div>

// //         <button
// //           type="submit"
// //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
// //           disabled={loading}
// //         >
// //           {loading ? 'Translating...' : 'Translate'}
// //         </button>
// //       </form>

// //       {translatedCode && (
// //         <div className="mt-6">
// //           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
// //           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
// //             {translatedCode}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// export default function CodeTranslator() {
//   const [code, setCode] = useState('');
//   const [targetLanguage, setTargetLanguage] = useState('Python');
//   const [translatedCode, setTranslatedCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTranslatedCode('');

//     const response = await fetch('/api/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code, targetLanguage }),
//     });

//     const reader = response.body?.getReader();
//     const decoder = new TextDecoder();
//     let result = '';

//     while (true) {
//       const { done, value } = await reader?.read()!;
//       if (done) break;
//       result += decoder.decode(value, { stream: true });
//     }

//     // Clean up the result to remove unwanted characters and properly join lines
//     let cleanResult = result
//       .replace(/(?:0:|\\n)+/g, '')
//       .replace(/\s\s+/g, ' ')
//       .replace(/["']/g, '')
//       .trim();

//     setTranslatedCode(cleanResult);
//     setLoading(false);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(translatedCode).then(
//       () => alert('Code copied to clipboard!'),
//       (err) => alert('Failed to copy code: ' + err)
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-2 gap-4 place-content-center h-48">
//         <h1 className="text-2xl font-bold mb-4">Code Translator</h1>
//         <Link
//           href="/"
//           className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
//           >
//             <polyline points="15 18 9 12 15 6" />
//           </svg>{' '}
//           Back
//         </Link>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="code"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Enter Code:
//           </label>
//           <textarea
//             id="code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="targetLanguage"
//             className="block text-gray-700 text-sm font-bold mb-2"
//           >
//             Target Language:
//           </label>
//           <select
//             id="targetLanguage"
//             value={targetLanguage}
//             onChange={(e) => setTargetLanguage(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             required
//           >
//             <option value="Python">Python</option>
//             <option value="JavaScript">JavaScript</option>
//             <option value="Java">Java</option>
//             <option value="C++">C++</option>
//             <option value="C#">C#</option>
//             <option value="Ruby">Ruby</option>
//             <option value="Go">Go</option>
//             <option value="PHP">PHP</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//           disabled={loading}
//         >
//           {loading ? 'Translating...' : 'Translate'}
//         </button>
//       </form>

//       {translatedCode && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
//           <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
//             {translatedCode}
//           </pre>
//           <button
//             onClick={handleCopy}
//             className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 mt-2"
//           >
//             Copy
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, targetLanguage }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader?.read()!;
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    // Clean up the result to remove unwanted characters and properly join lines
    let cleanResult = result
      .replace(/(?:0:|\\n)+/g, '')
      .replace(/\s\s+/g, ' ')
      .replace(/["']/g, '')
      .trim();

    setTranslatedCode(cleanResult);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedCode);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);
  };

  return (
    <div className="container mx-auto p-4">
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
          <select
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
          </select>
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
          <h2 className="text-xl font-bold mb-2">Translated Code:</h2>
          <pre className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-4">
            {translatedCode}
          </pre>
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
