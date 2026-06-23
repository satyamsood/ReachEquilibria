# ReachEquilibria Deployment

## Best Setup: Automatic Deploys With GitHub

Use this once so you do not have to manually upload a zip every time.

1. Create a GitHub repository for this folder.
2. Push the whole project to GitHub.
3. In Cloudflare, go to **Workers & Pages**.
4. Choose **Create application** or open the existing Pages project.
5. Connect the GitHub repository.
6. If Cloudflare shows **Build command** and **Deploy command**, use these:

   - **Build command:** `node work/build-reachequilibria-v2.js`
   - **Deploy command:** `npx wrangler@latest deploy`
   - **Root directory:** leave blank unless Cloudflare asks for one

The deploy command uses `wrangler.toml`, which points Cloudflare to:

```text
outputs/reachequilibria-site
```

7. Keep the custom domains attached:

   - `reachequilibria.org`
   - `www.reachequilibria.org`

After this, every time the GitHub repository is updated, Cloudflare rebuilds and redeploys the site automatically.

## Backup Option: One-Command Deploy From This Computer

If Node/npm and Cloudflare Wrangler are installed/logged in on this computer, run:

```bash
npm run deploy:workers
```

If Cloudflare asks for a project name, use the same Cloudflare Pages project that is connected to `reachequilibria.org`.

## Manual Zip Backup

If you ever still need a zip:

```bash
npm run package
```

That creates:

```text
outputs/reachequilibria-site-latest.zip
```

## Important

Do not change DNS for normal website updates. DNS points the domain to Cloudflare. Deployments update the website content.
