# Deployment guide

This redesign is a static Vite site. The public page is crawler-readable HTML, and Three.js provides the optional interactive drone viewer. There is no app server or database in this build; the email and telephone links open the visitor's email or dialler.

## Local commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
```

The production output is `dist/`. `vercel.json` configures Vercel to install from the committed pnpm lockfile, build the site, and serve that directory.

## Release note

The redesign is prepared on the review branch `redesign/blackvolt-2026-10`; it has not been merged to the default branch or published to `www.blackvolt.in`. Merging it may trigger the repository's Vercel production deployment, depending on the existing project settings.

All programme status statements are explicitly dated to the user-supplied *VAJRA-KAAL System Concept & Architecture*, revision 3.0, August 2026. Reconfirm the maturity snapshot before a production release if the programme has changed since that document.
