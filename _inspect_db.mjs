import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = 'https://hjglujffcjbrmugoprjh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ2x1amZmY2picm11Z29wcmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTQ5NjUsImV4cCI6MjA5NDUzMDk2NX0.hbeP1zWBYvsH9BCsoyaBOkoZfIvY9U1uXdSSwxmuvos';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  // Try to select from seasons
  const { data, error } = await supabase.from('seasons').select('*').limit(5);
  console.log('=== seasons data ===');
  console.log(JSON.stringify(data, null, 2));
  console.log('=== error ===');
  console.log(JSON.stringify(error, null, 2));

  // Try to insert a test season to see what fields are required
  const { data: insertData, error: insertError } = await supabase.from('seasons').insert({
    name: 'TEST_TEMP',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    status: 'inactive'
  }).select();

  console.log('=== insert result ===');
  console.log(JSON.stringify(insertData, null, 2));
  console.log('=== insert error ===');
  console.log(JSON.stringify(insertError, null, 2));

  // Clean up test
  if (insertData && insertData.length > 0) {
    await supabase.from('seasons').delete().eq('id', insertData[0].id);
  }
}

inspect().catch(console.error);
</write_to_file>