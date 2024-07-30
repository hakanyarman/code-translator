import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/utils/supabase/server';

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
          no title. only code. Code: ${code}\nTranslate to: ${targetLanguage} just add comments explaining the functionality of each lines.  dont give markdown signs and target language name. dont give target language in backtick character.for example never give me code in. \`\`\`  javascript  \`\`\` if the code i wrote is invalid or not code just say "Invalid code". If the input i wrote does not belong to any programming language (for example: nonsense things like "qengolqev","adgwrgorb"), do not try to translate it to the programming language I want, just give the output "invalid code". Think first, if the input I gave you is not a code block, answer me directly with "invalid code".   `
      : `You are a code translator. Translate the following code to the specified programming language without any explanation. just target language code.
          no title. only code. Code: ${code}\nTranslate to: ${targetLanguage} dont give markdown signs and target language name. dont give target language in backtick character. for example never give me code in. \`\`\`  javascript  \`\`\` If the input i wrote does not belong to any programming language (for example: nonsense things like "qengolqev","adgwrgorb"), do not try to translate it to the programming language I want, just give the output "invalid code"  Think first, if the input I gave you is not a code block, answer me directly with "invalid code".`;

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
    const translatedCode = response.content[0]['text'];

    // Save the translation to Supabase
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Could not get user info:', userError);
      return;
    }

    const { error: insertError } = await supabase
      .from('code_translations')
      .insert({
        user_id: user.user.id,
        source_code: code,
        translated_code: translatedCode,
        source_language: includeComments ? 'source' : 'source',
        target_language: targetLanguage,
      });

    if (insertError) {
      console.error('Could not save translation:', insertError);
    }

    return new Response(JSON.stringify({ text: translatedCode }), {
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
