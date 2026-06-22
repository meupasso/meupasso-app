// This runs during build and can access production env vars
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('SUPABASE_URL=' + url);
console.log('SUPABASE_ANON=' + anon);
console.log('SUPABASE_SERVICE=' + (service ? 'EXISTS-' + service.substring(0, 15) + '...' : 'NOT_FOUND'));
