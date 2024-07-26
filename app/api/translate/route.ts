import Anthropic from '@anthropic-ai/sdk';

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { code, targetLanguage, includeComments } = await req.json();

    const prompt = includeComments
      ? `You are a code translator. Translate the following code to the specified programming language without any explanation. just target language code.
          no title. only code. Code: ${code}\nTranslate to: ${targetLanguage} just add comments explaining the functionality of each lines dont give the target language in three apostrophe dont give markdown signs and target language name`
      : `You are a code translator. Translate the following code to the specified programming language without any explanation. just target language code.
          no title. only code. Code: ${code}\nTranslate to: ${targetLanguage} dont give markdown signs and target language name dont give the target language in three apostrophe`;

    const response = await anthropic.messages.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'claude-3-haiku-20240307',
      stream: false,
      max_tokens: 300,
    });
    // console.log('Anthropic response:', response);

    // Assuming response.content[0].text contains the translated code
    //@ts-ignore
    return new Response(JSON.stringify({ text: response.content[0]['text'] }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
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

// auth için protecectedLayout oluştur.
