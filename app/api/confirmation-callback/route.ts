import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Geçersiz doğrulama kodu.' },
      { status: 400 }
    );
  }

  // Kullanıcıyı özel bir sayfaya yönlendirme
  const redirectTo = 'http://your-app-url/verification-success';
  return NextResponse.redirect(redirectTo);
}
