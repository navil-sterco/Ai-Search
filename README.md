# GL-BAJAJ — AI Search

A Next.js (App Router) front end for the GL Bajaj AI-search API, styled like a research notebook. Results are revealed progressively — the answer types out word by word, then each content block ("Note", "List", "Figures", "Sources") fades in one at a time with a tick mark lighting up in the left margin — simulating a chunked/streaming response even though the upstream API returns one JSON payload.

## Structure

- `app/api/search/route.ts` — server route that proxies `GET https://project-demo.in/gl-bajaj-demo/api/ai-search?q=...` (avoids CORS, keeps the upstream URL off the client).
- `components/SearchExperience.tsx` — search bar + orchestration of the loading → typing → block-reveal sequence.
- `components/Loader.tsx` — pen-nib loading state with cycling status lines, shown while waiting on the API.
- `components/TypewriterText.tsx` — word-by-word text reveal for the answer paragraph.
- `components/ResultBlocks.tsx` — renders `richtext`, `list`, `stats`, and `links` blocks, with a margin "tick" gutter.
- `lib/types.ts` — response typings matching the API's `blocks` shape.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 and search (defaults to "b.tech in computer science").

Note: the display/body/mono fonts (Fraunces, Inter, IBM Plex Mono) load from Google Fonts via `next/font/google` at build time, so an internet connection is needed for `npm run build` / `npm run dev` to fetch them the first time.
