import React from 'react';
import { useRouter } from 'next/router'; // Update import statement

export default function ConfirmationSuccess() {
  const router = useRouter();
  const token = router.query.token; // Eğer token geçiliyorsa, burada alınabilir
  return (
    <div className="container mx-auto text-center p-4">
      <h1 className="text-2xl font-bold">Üyeliğiniz Doğrulandı!</h1>
      <p className="mt-4">
        Hesabınız başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.
      </p>
    </div>
  );
}
