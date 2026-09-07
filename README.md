# Faiz Hashim — digital portfolio

A single-page Next.js portfolio with nine sections, alternating black and white, locally hosted handwritten fonts, and plain CSS. All personal details and project links come from the supplied references and earlier portfolio materials.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Add your images

Place your portrait and three screenshots in `public/images/`. In `src/lib/content.ts`, set `profile.portrait` and each project's `image` to a path such as `/images/portrait.jpg` or `/images/barbershop.png`.

The portrait is reused in Home, About and Contact. Empty strings intentionally display empty, labelled frames. Portraits fill their frame; screenshots keep their original proportions without cropping. Update the alt text in `src/app/page.tsx` if needed.

## Edit the portfolio

- `src/lib/content.ts`: contact details, tools, project copy, URLs and image paths.
- `src/app/page.tsx`: nine-section layout and remaining copy.
- `src/app/globals.css`: colours, fonts, spacing and responsive layouts. `--section-space` controls shared section padding.
- `src/components/navigation.tsx`: active navigation and accessible mobile menu. The three project sections keep Work active.
- `src/components/portfolio-elements.tsx`: reusable image frames, links and simple line icons.

## Check and build

```sh
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm run build
```

The production build exports to `out/`, ready for static hosting. To preview that export locally, run `npm start`. No hosting account or remote deployment is needed to develop this project.

Browser checks cover 320, 390, 768, 1024, 1440 and 1920px widths, section order, text overflow, grid collisions, anchor navigation, active links, the mobile menu, keyboard access, reduced motion and contact destinations. Screenshots are saved in `test-results/`.

Fonts: DM Sans, Caveat and Nothing You Could Do, distributed under the SIL Open Font License; licence files are included in `public/fonts/`.
