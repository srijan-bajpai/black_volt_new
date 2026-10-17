# BlackVolt Technologies — website

A static, responsive Vite site for BlackVolt Technologies. Its chapters run in this order: Long-Endurance Autonomous Underwater Vehicle (AUV), interceptor concepts, then the VAJRA-KAAL counter-UAS system concept.

The AUV chapter distinguishes CAD dimensions, requirements, future aims, current and next work, and the explicit no-wet-test caveat. Two interactive Three.js viewers present an illustrative batoid-inspired blended-wing-body AUV and a four-pylon interceptor-family concept. Neither model is CAD or a depiction of tested hardware. The interceptor chapter distinguishes the family concept from the current printed airframes and describes the Sprint/Picket roles. VAJRA-KAAL follows with its proposed system architecture, clear maturity limits, and laboratory images of current hardware.

The company section includes leadership profiles and portraits for Garv Pathak, Co-Founder & CEO — AI Systems, and Sarthak Varchasvi, Co-Founder & CTO — Robotics, with their LinkedIn profiles. The footer links to BlackVolt's LinkedIn and Instagram accounts.

Programme status and figures are presented with their respective qualifiers: current work, design intent, CAD dimensions, requirements, or future aims. The AUV has not been wet-tested; the interceptor family is an illustrative concept, and VAJRA-KAAL is not an operational system.

## Development

- `pnpm install` installs the pinned dependencies.
- `pnpm dev` serves the site on port 3000.
- `pnpm check` runs TypeScript diagnostics.
- `pnpm build` type-checks and writes the static site to `dist/`.
