// app/page.tsx
import supabase from '../../utils/supabase';

export default async function Home() {
  const { data, error } = await supabase.from('n').select('*');

  if (error) {
    console.error(error);
    return <div>Failed to load data</div>;
  }

  return (
    <div>
      <h1>Data from Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
