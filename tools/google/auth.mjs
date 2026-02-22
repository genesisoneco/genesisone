import fs from 'node:fs/promises';
import path from 'node:path';
import { authenticate } from '@google-cloud/local-auth';

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/spreadsheets'
];

const CWD = process.cwd();
const CREDENTIALS_PATH = path.join(CWD, 'credentials.json');
const TOKEN_PATH = path.join(CWD, 'token.json');

async function main() {
  try {
    await fs.access(CREDENTIALS_PATH);
  } catch {
    console.error('Missing credentials.json in tools/google/. Download it from Google Cloud OAuth Desktop client.');
    process.exit(1);
  }

  const client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (!client.credentials) {
    console.error('No credentials received from OAuth flow.');
    process.exit(1);
  }

  await fs.writeFile(TOKEN_PATH, JSON.stringify(client.credentials, null, 2));
  console.log('✅ Auth complete. Saved token.json');
}

main().catch((err) => {
  console.error('Auth failed:', err.message);
  process.exit(1);
});
