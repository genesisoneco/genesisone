const token = process.env.GUMROAD_ACCESS_TOKEN;

if (!token) {
  console.error('GUMROAD_ACCESS_TOKEN is missing.');
  process.exit(1);
}

async function main() {
  const url = new URL('https://api.gumroad.com/v2/user');
  url.searchParams.set('access_token', token);

  const res = await fetch(url, { method: 'GET' });
  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.success === false) {
    console.error('GUMROAD_ERR', data.message || `${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const user = data.user || {};
  console.log('GUMROAD_OK');
  console.log(`- Name: ${user.name || '-'} `);
  console.log(`- Email: ${user.email || '-'} `);
}

main().catch((err) => {
  console.error('GUMROAD_ERR', err.message);
  process.exit(1);
});
