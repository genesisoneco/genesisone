# Gumroad Access Test (Local)

1) Save token (PowerShell):

```powershell
[Environment]::SetEnvironmentVariable("GUMROAD_ACCESS_TOKEN","YOUR_TOKEN","User")
$env:GUMROAD_ACCESS_TOKEN="YOUR_TOKEN"
```

2) Open a new terminal and run:

```bash
cd C:\Users\creverse\.openclaw\workspace\tools\gumroad
npm run test
```

Expected success output starts with `GUMROAD_OK`.
