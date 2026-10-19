# Movies App

A Next.js app that shows TMDB movies in a grid, filtered by genre and sortable by rating, release date, or title. Filter and sort state live in the URL, so every view is shareable.

## Setup

Requires Node 20.11 or later.

1. Copy `.env.example` to `.env.local` and add a TMDB API key. `.env.local` is gitignored.
2. Install, build, and start:

   ```
   npm i && npm start
   ```

   `npm start` runs `next build && next start`, so it works on a fresh clone with no separate build step.

3. Open [http://localhost:3000](http://localhost:3000).

Without a key, the app still runs, but shows an error page ("Couldn't load movies"). The cause is logged in the server terminal.

## Development

```
npm run dev    # dev server with hot reload
npm test       # unit tests (Vitest)
npm run lint
```

## Features

- **Genre filter:** applied in the TMDB request (`with_genres`), with an "All genres" option
- **Sorting:** by rating, release date, or title, ascending or descending
- **Cards:** poster (with a fallback when TMDB has none), title, rating, and a hover lift
- **Responsive grid:** 2 columns on phones, more on wider screens
- **Loading, error, and empty states**
- **Shareable URLs:** e.g. `/?genre=28&sort=title&dir=asc`

## Project structure

```
app/
├── page.tsx              Reads URL params, fetches movies and genres, renders the page
├── loading.tsx           Skeleton grid for the first load
├── error.tsx             Error page with a retry button
└── api/movies/route.ts   JSON endpoint for client-side code
components/
├── Controls.tsx          Genre and sort dropdowns (client component)
└── MovieCard.tsx         A single movie card
lib/
├── tmdb.ts               TMDB requests (shared tmdbFetch helper)
├── sortMovies.ts         Pure sort function and URL param type guards
├── sortMovies.test.ts    Unit tests
└── types.ts              Movie, Genre, and sort types
```

## Decisions and tradeoffs

- **The API key stays on the server.** Only server code calls TMDB, through one `tmdbFetch` helper. The browser never sees the key. `/api/movies` exists for client-side code (e.g. a future "load more"). There's no `/api/genres` because only the server needs the genre list.
- **Server components for data, small client components for interaction.** `page.tsx` fetches and sorts on the server. Only `Controls` (the dropdowns) and `error.tsx` (the retry button) run in the browser.
- **Filter in the TMDB request, sort on the server.** The genre is sent to TMDB as required. Sorting runs in `page.tsx` through `sortMovies`, a pure function that uses `toSorted` (it never mutates its input) and is unit-tested. I originally planned to sort in the browser, but sorting where the data already is turned out simpler, and the browser doesn't need the sorting code.
- **The URL is the state.** The dropdowns only update the URL, and the server re-renders. Views are shareable and bookmarkable, and the back button undoes a change. For a growth team, this means a campaign link or analytics event can point to an exact view.
- **URL input is validated once, on the server.** `?sort=banana` falls back to the default (rating, high to low) instead of erroring. Type guards (`isSortKey`, `isSortDirection`) check the value at runtime and narrow its TypeScript type.
- **`vote_count.gte=100`.** Without a minimum vote count, movies with a few 10/10 votes top the rating sort.
- **Movies and genres are fetched in parallel** with `Promise.all`. If the genre list fails, the page still shows movies, just without genre options. If movies fail, the error page is shown.
- **Errors:** the real cause goes to the server log, and users see a generic message, so internal details like missing config never reach the browser. The API route returns 502, since the failure is upstream at TMDB.
- **Loading:** `loading.tsx` covers the first page load. Changing the genre or sort is a React transition, which keeps the current grid on screen, so `useTransition` shows "Updating…" and `useOptimistic` updates the dropdown right away.
- **`cacheComponents` is turned off.** The page depends entirely on the URL, so the simpler request-time rendering model fits better than prerendering.
- **TypeScript in strict mode, no `any`.** It's the team's production stack, and it caught real cases while building: `poster_path` can be `null`, URL params can be arrays or missing, and invalid sort keys fail to compile.

## Next steps

- Pagination or "load more" (TMDB has hundreds of pages)
- Validate TMDB responses at runtime (e.g. with Zod). Types aren't checked at runtime, and extra fields currently pass through `/api/movies`.
- Component tests (React Testing Library) for `Controls`
- Cache the genre list, which rarely changes
- Put the genre name in the browser tab title and link previews (`generateMetadata`)
- Ignore "The" and "A" when sorting by title
- Separate error types, so a missing key (500) is distinguished from a TMDB failure (502)
- Tell the user when a `?genre=` id doesn't exist, instead of just showing an empty grid
