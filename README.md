# BlackVolt Technologies — website redesign

A static, responsive Vite site for BlackVolt Technologies. Its chapters run in the requested order: Long-Endurance Autonomous Underwater Vehicle (AUV), interceptor concepts, then the VAJRA-KAAL counter-UAS system concept.

The first chapter gives the AUV a multi-section programme summary with source-labeled CAD dimensions, requirements, future aims, current/next status, and the explicit no-wet-test caveat. Two separate interactive Three.js viewers present an illustrative batoid-inspired blended-wing-body AUV and a four-pylon interceptor-family concept reconstructed from the supplied PDF. Neither model is CAD or a depiction of tested hardware. The interceptor chapter distinguishes the rendered concept from the current printed airframes and Sprint/Picket concept roles. VAJRA-KAAL follows with its proposed system architecture, clear maturity limits, and genuine hardware photographs from the supplied PDF.

## Development

- `pnpm install` installs the pinned dependencies.
- `pnpm dev` serves the site on port 3000.
- `pnpm check` runs TypeScript diagnostics.
- `pnpm build` type-checks and writes the static site to `dist/`.

## Content and asset provenance

Programme details follow the user-supplied `BV/AUV/01` AUV brief, Issue 2 (29 September 2026), and *VAJRA-KAAL System Concept & Architecture*, revision 3.0 (August 2026). The maturity snapshot is date-stamped to the AUV source. Current hardware photographs are extracted from the supplied PDF's pages 33–34, and the interceptor family render comes from its concept page. Three.js meshes are original, programmatically generated illustrative assets; they are not engineering drawings or flight-ready products. Unsupported placeholder metrics and unrelated stock imagery are not used.
