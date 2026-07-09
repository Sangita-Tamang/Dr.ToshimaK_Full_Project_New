# Deployment & Verification

This file documents the environment variables and quick verification commands for deploying the frontend (Vercel) and backend (Render).

## Backend (Render)

Required environment variables (set in Render > Service > Environment):

- `MONGO_URI` — MongoDB Atlas connection string (keep secrets out of repo)
- `JWT_SECRET` — JWT signing secret (must match tokens used for admin accounts)
- `ALLOWED_ORIGINS` — Optional comma-separated list of origins to whitelist for CORS (e.g. `https://your-frontend.vercel.app`)
- `NODE_ENV` — `production`

Notes:
- Do NOT commit `.env` files or secrets to git.
- `ALLOWED_ORIGINS` is appended to the default localhost/dev origins.

After deploy, trigger a manual deploy in Render or let it build on push.

## Frontend (Vercel)

Set the following environment variable in Vercel > Project Settings > Environment Variables:

- `VITE_API_URL` = `https://dr-tk-backend.onrender.com` (no trailing `/api` required)

Redeploy the Vercel project after updating the env var.

## Verification commands

1. Login to get a token (replace with your admin credentials):

```bash
curl -s -X POST https://dr-tk-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<ADMIN_EMAIL>","password":"<ADMIN_PASSWORD>"}' | jq
```

The response contains `token` on success.

2. Verify backend sees contact messages (uses the token from step 1):

```bash
curl -s -X GET https://dr-tk-backend.onrender.com/api/debug/stats \
  -H "Authorization: Bearer <TOKEN>" | jq
```

3. Fetch contacts directly from API:

```bash
curl -s -X GET https://dr-tk-backend.onrender.com/api/contact \
  -H "Authorization: Bearer <TOKEN>" | jq
```

4. Browser check (Admin UI):
- Log in to admin UI.
- Open DevTools → Network.
- Confirm `GET /api/contact` is sent to `https://dr-tk-backend.onrender.com/api/contact` and returns `200` with data.

## Troubleshooting

- If `GET /api/contact` returns `401`: ensure `JWT_SECRET` on Render matches the secret used to create admin users.
- If requests are blocked by CORS: add your Vercel origin to `ALLOWED_ORIGINS` (comma-separated) and redeploy the backend.
- If frontend still targets `localhost`, ensure `VITE_API_URL` in Vercel is set and frontend redeployed.

## Security reminder

- Keep secrets in environment variables only. Rotate `JWT_SECRET` and Atlas credentials if they are exposed.
