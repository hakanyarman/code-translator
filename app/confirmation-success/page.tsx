// // app/confirmation-success/page.tsx
// 'use client';

// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';

// const VerificationSuccess = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const { code } = router.query;

//     if (code) {
//       // Doğrulama kodunu işleme alabilirsiniz burada
//       // Örneğin, Supabase'de doğrulama kodunu kullanarak kullanıcıyı doğrulayabilirsiniz

//       // Yükleniyor state'ini kaldır
//       setLoading(false);
//     }
//   }, [router.query]);

//   return (
//     <div>
//       {loading ? <p>Yükleniyor...</p> : <h1>Üyeliğiniz Onaylanmıştır!</h1>}
//     </div>
//   );
// };

// export default VerificationSuccess;
import React from 'react';

const VerificationSuccess = () => {
  return (
    <div>
      <h1>Üyeliğiniz Onaylanmıştır!</h1>
      <p>Artık uygulamamıza giriş yapabilirsiniz.</p>
    </div>
  );
};

export default VerificationSuccess;
