import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmationSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Eğer URL'de `token` parametresi varsa bu şekilde alınabilir

  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-2xl font-bold">Üyeliğiniz Doğrulandı!</h1>
      <p className="mt-4">
        Hesabınız başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.
      </p>
    </div>
  );
}
