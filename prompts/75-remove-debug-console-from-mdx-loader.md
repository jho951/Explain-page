User request:

- Remove the remaining lint warning before commit/push.

Work performed:

- Removed the debug `console.log` from `libs/get-mdx-content.ts`.

Reason:

- The project pre-push lint step still reported one `no-console` warning in this file.
