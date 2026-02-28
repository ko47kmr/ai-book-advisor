# AIアドバイスサービス

著者のビジネス書の内容をベースにしたAIアドバイスサービスです。ユーザーはユーザー登録不要で、悩みや質問をチャット形式で入力し、書籍の内容に基づいた信頼性の高いアドバイスを得ることができます。

## 主な機能

- ✅ ユーザー登録不要のチャット形式
- ✅ 過去の会話の文脈を引き継いだ連続したチャット
- ✅ localStorageによる履歴の永続化（ページリロード後も会話が継続）
- ✅ 新しい相談を始める機能（履歴リセット）
- ✅ 自動スクロール機能
- ✅ レスポンシブデザイン（PC・スマホ対応）

## 技術スタック

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UIコンポーネント)
- **Lucide React** (アイコン)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## カスタマイズ

### サービス名や設定の変更

[lib/config.ts](lib/config.ts) ファイルで以下の設定を変更できます：

```typescript
export const config = {
  // サービス名（ヘッダーに表示）
  serviceName: "書籍名 AIアドバイザー", // ← ここを変更

  // 書籍購入ページのURL
  bookPurchaseUrl: "https://example.com/book", // ← ここを変更

  // AIの初期挨拶メッセージ
  initialMessage: "こんにちは！私は書籍の内容を...", // ← ここを変更

  // 免責事項
  disclaimer: "※本サービスはAIによる回答であり...", // ← ここを変更

  // localStorageのキー名
  storageKey: "ai-book-advisor-chat-history",
};
```

### AI APIの連携

現在、API Routesはモックレスポンスを返しています。実際のAI APIと連携するには、[app/api/chat/route.ts](app/api/chat/route.ts) を編集してください。

```typescript
// モックレスポンスの部分を実際のAI API呼び出しに置き換える
// 例: OpenAI API, Anthropic Claude API, Google Gemini API など
```

## プロジェクト構造

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # チャットAPI（現在はモック）
│   ├── globals.css             # グローバルスタイル
│   ├── layout.tsx              # レイアウト
│   └── page.tsx                # メインページ（チャット画面）
├── components/
│   ├── chat/
│   │   ├── header.tsx          # ヘッダーコンポーネント
│   │   ├── message.tsx         # メッセージコンポーネント
│   │   ├── chat-input.tsx      # 入力エリアコンポーネント
│   │   └── footer.tsx          # フッターコンポーネント
│   └── ui/                     # shadcn/uiコンポーネント
├── lib/
│   ├── config.ts               # 設定ファイル
│   ├── types.ts                # 型定義
│   └── utils.ts                # ユーティリティ関数
└── README.md
```

## デプロイ

### Vercelへのデプロイ

1. [Vercel](https://vercel.com)にサインアップ
2. GitHubリポジトリをインポート
3. 自動的にデプロイが開始されます

詳細は[Next.jsデプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)を参照してください。

## ライセンス

MIT
