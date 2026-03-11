User request:

- Remove all RSS-related functionality, icons, and design elements.

Work performed:

- Removed RSS generation from the build pipeline in `package.json`.
- Removed `rss` and `@types/rss` from `package.json` and `package-lock.json`.
- Removed RSS link injection from both app layouts.
- Removed the RSS social icon from footer navigation.
- Removed the subscribe/RSS promo panel from the home portfolio landing footer section.
- Deleted RSS generator implementation, RSS script component, and generated `public/rss.xml`.

Reason:

- The user no longer wants any RSS feature or RSS-related UI in the product.
