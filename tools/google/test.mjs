import fs from 'node:fs/promises';
import path from 'node:path';
import { google } from 'googleapis';

const CWD = process.cwd();
const CREDENTIALS_PATH = path.join(CWD, 'credentials.json');
const TOKEN_PATH = path.join(CWD, 'token.json');

function getClientSecrets(data) {
  const root = data.installed || data.web;
  if (!root) throw new Error('credentials.json must contain installed or web OAuth client');
  return root;
}

async function buildAuth() {
  const creds = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf8'));
  const token = JSON.parse(await fs.readFile(TOKEN_PATH, 'utf8'));
  const root = getClientSecrets(creds);

  const auth = new google.auth.OAuth2(root.client_id, root.client_secret, root.redirect_uris?.[0]);
  auth.setCredentials(token);
  return auth;
}

async function main() {
  const auth = await buildAuth();

  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });
  const sheets = google.sheets({ version: 'v4', auth });

  const me = await drive.about.get({ fields: 'user(displayName,emailAddress)' });
  console.log('✅ Drive identity:', me.data.user?.displayName, `<${me.data.user?.emailAddress}>`);

  const list = await drive.files.list({
    pageSize: 5,
    fields: 'files(id,name,mimeType,modifiedTime)',
    q: "trashed=false",
    orderBy: 'modifiedTime desc'
  });

  console.log('\nRecent Drive files:');
  for (const f of list.data.files || []) {
    console.log(`- ${f.name} [${f.mimeType}] (${f.id})`);
  }

  const doc = await docs.documents.create({ requestBody: { title: 'Genesis Docs API Test' } });
  console.log('\n✅ Created test Doc:', doc.data.title, doc.data.documentId);

  const sheet = await sheets.spreadsheets.create({
    requestBody: { properties: { title: 'Genesis Sheets API Test' } }
  });
  console.log('✅ Created test Sheet:', sheet.data.properties?.title, sheet.data.spreadsheetId);
}

main().catch((err) => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
