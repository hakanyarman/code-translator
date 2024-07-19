// import Anthropic from '@anthropic-ai/sdk';
// import { AnthropicStream, StreamingTextResponse } from 'ai';

// // Create an Anthropic API client (that's edge friendly)
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY || '',
// });

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { code, targetLanguage } = await req.json();

//   const messages = [
//     {
//       role: 'assistant',
//       content:
//         'You are a code translator. Translate the following code to the specified programming language.',
//     },
//     {
//       role: 'user',
//       content: `Code: ${code}\nTranslate to: ${targetLanguage}`,
//     },
//   ];

//   const response = await anthropic.messages.create({
//     messages,
//     model: 'claude-3-haiku-20240307',
//     stream: true,
//     max_tokens: 300,
//   });

//   const stream = AnthropicStream(response);

//   return new StreamingTextResponse(stream);
// }

// import Anthropic from '@anthropic-ai/sdk';
// import { AnthropicStream, StreamingTextResponse } from 'ai';

// // Create an Anthropic API client (that's edge friendly)
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY || '',
// });

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   try {
//     const { code, targetLanguage } = await req.json();

//     const messages = [
//       {
//         role: 'assistant',
//         content:
//           'You are a code translator. Translate the following code to the specified programming language.',
//       },
//       {
//         role: 'user',
//         content: `Code: ${code}\nTranslate to: ${targetLanguage}`,
//       },
//     ];

//     const response = await anthropic.messages.create({
//       messages,
//       model: 'claude-v1', // Geçerli bir model adı kullanın
//       stream: true,
//       max_tokens: 300,
//     });

//     const stream = AnthropicStream(response);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response('An error occurred', { status: 500 });
//   }
// }

// import Anthropic from '@anthropic-ai/sdk';
// import { AnthropicStream, StreamingTextResponse } from 'ai';

// // Create an Anthropic API client (that's edge friendly)
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY || '',
// });

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { code, targetLanguage } = await req.json();

//   const messages = [
//     {
//       role: 'system',
//       content:
//         'You are a code translator. Translate the following code to the specified programming language.',
//     },
//     {
//       role: 'user',
//       content: `Code: ${code}\nTranslate to: ${targetLanguage}`,
//     },
//   ];

//   try {
//     const response = await anthropic.completions.create({
//       prompt: messages.map((m) => m.content).join('\n'),
//       model: 'claude-3-haiku-20240307',
//       max_tokens: 300,
//       stream: true,
//     });

//     const stream = AnthropicStream(response);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error('Error creating completion:', error);
//     return new Response('Error creating completion', { status: 500 });
//   }
// }
// import Anthropic from '@anthropic-ai/sdk';
// import { AnthropicStream, StreamingTextResponse } from 'ai';

// // Create an Anthropic API client (that's edge friendly)
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY || '',
// });

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   try {
//     const { code, targetLanguage } = await req.json();

//     const messages = [
//       {
//         role: 'assistant',
//         content:
//           'You are a code translator. Translate the following code to the specified programming language.',
//       },
//       {
//         role: 'user',
//         content: `Code: ${code}\nTranslate to: ${targetLanguage}`,
//       },
//     ];

//     // Geçerli model adı kullandığınızdan emin olun
//     const response = await anthropic.completions.create({
//       prompt: messages.map((m) => `${m.role}: ${m.content}`).join('\n'),
//       model: 'claude-v1', // Doğru model adı
//       stream: true,
//       max_tokens: 300, // Doğru parametre adı (camelCase)
//     });

//     const stream = AnthropicStream(response);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error('Error:', error.message || error);
//     return new Response(
//       'An error occurred: ' + (error.message || 'Unknown error'),
//       { status: 500 }
//     );
//   }
// }

// import Anthropic from '@anthropic-ai/sdk';
// import { AnthropicStream, StreamingTextResponse } from 'ai';

// // Create an Anthropic API client (that's edge friendly)
// const anthropic = new Anthropic({
//   apiKey: process.env.CLAUDE_API_KEY || '',
// });

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   try {
//     const { code, targetLanguage } = await req.json();

//     const response = await anthropic.messages.create({
//       messages: [
//         {
//           role: 'user',
//           content: `You are a code translator. Translate the following code to the specified programming language without any explenation. just target language code. Code: ${code}\nTranslate to: ${targetLanguage}`,
//         },
//       ],
//       model: 'claude-3-haiku-20240307',
//       stream: true,
//       max_tokens: 300,
//     });

//     const stream = AnthropicStream(response);

//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error('Error:', error);

//     let errorMessage = 'An unknown error occurred';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     } else if (typeof error === 'string') {
//       errorMessage = error;
//     } else if (
//       typeof error === 'object' &&
//       error !== null &&
//       'message' in error
//     ) {
//       errorMessage = (error as any).message;
//     }

//     return new Response(`An error occurred: ${errorMessage}`, { status: 500 });
//   }
// }

import Anthropic from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { code, targetLanguage } = await req.json();

    const response = await anthropic.messages.create({
      messages: [
        {
          role: 'user',
          content: `You are a code translator. Translate the following code to the specified programming language without any explanation. just target language code. no title. only code. Code: ${code}\nTranslate to: ${targetLanguage}`,
        },
      ],
      model: 'claude-3-haiku-20240307',
      stream: true,
      max_tokens: 300,
    });

    const stream = AnthropicStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error:', error);

    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      errorMessage = (error as any).message;
    }

    return new Response(`An error occurred: ${errorMessage}`, { status: 500 });
  }
}
