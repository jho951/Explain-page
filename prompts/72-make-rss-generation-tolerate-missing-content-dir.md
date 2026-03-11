User request:

- Fix build/push failure caused by RSS generation throwing when `content/ko` does not exist.

Work performed:

- Updated `libs/rss-generate.ts` to check whether `content/ko` exists before reading it.
- If the directory exists, RSS items are generated as before.
- If the directory is missing, the script logs a warning and still writes a valid RSS file instead of throwing.

Reason:

- The repository currently has no `content/` directory, so build hooks should not fail on a missing optional content source.
