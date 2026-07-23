# ぬいぴた

ぬい服のサイズ確認、採寸カルテ、ぬいポーチ内寸の比較を端末内で行うWebアプリです。

## 開発

```sh
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:cf
pnpm preview
```

公開先はCloudflare Workers（OpenNext）です。`wrangler.jsonc`のcustom domainとCloudflare認証を確認してから`pnpm deploy`を実行します。

## 設計

判定結果は寸法から見た目安です。初期実装では共有codecとブラウザー保存を小さく分離し、外部データベースやアカウントを使いません。
