# ぬいぴた architecture

## Runtime boundary

The application is an App Router Next.js application bundled by `@opennextjs/cloudflare` and deployed as a Cloudflare Worker. The Worker serves static assets and rendered pages; it does not store user data. There are no D1, KV, R2, Durable Objects, CMS, authentication, or application API bindings.

## Browser-owned data

`src/lib/storage.ts` contains the small native IndexedDB Promise wrapper. The `nuipita` database has the `profiles`, `garmentDrafts`, `pouchDrafts`, `results`, and `settings` stores. Upgrade work is isolated in `migrate()`. If storage is unavailable, screens remain usable for the current session and expose a short Japanese notice.

## Feature boundaries

- `src/features/profiles`: profile types, measurement registry, and avatar rendering.
- `src/features/fit`: garment registry and pure fit calculations.
- `src/features/pouch`: pure orientation and inner-dimension calculations.
- `src/lib/share.ts`: versioned, validated base64url payloads shared by browser pages and Worker-rendered OGP routes.
- `src/content/blog`: typed local editorial content.

The UI owns input and presentation only. Calculation functions return states and reason codes; Japanese copy is selected in the UI layer.
