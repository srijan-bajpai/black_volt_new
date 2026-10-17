# Deployment guide

This redesign is a static Vite site. The public page is crawler-readable HTML, and Three.js provides the optional interactive vehicle viewers. There is no app server or database in this build; the email and telephone links open the visitor's email client or dialler.

## Local commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
```

The production output is `dist/`. `vercel.json` configures the build and static output directory.

## Release state

Merging approved changes to the default branch may trigger the repository's configured production deployment. Verify the deployment status with the hosting provider before confirming the live site has updated.

Programme maturity and performance statements are time-sensitive; confirm current status with the team before future releases.
