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

### 書籍ファイルの配置

1. **`data/`ディレクトリに書籍の内容を配置**

書籍の内容をテキストファイルとして保存してください：

```
data/
└── book.txt  # 書籍の全内容（単一ファイル）
```

または章ごとに分割：

```
data/
├── chapter-01.txt
├── chapter-02.txt
└── ...
```

詳細は [data/README.md](data/README.md) を参照してください。

⚠️ **注意**: `data/`ディレクトリは `.gitignore` に含まれており、GitHubにはプッシュされません（著作権保護）。

### AI APIの連携

現在、API Routesはモックレスポンスを返しています。実際のAI APIと連携するには、[app/api/chat/route.ts](app/api/chat/route.ts) を編集してください。

実装例はファイル内にコメントで記載されています：
- OpenAI API
- Anthropic Claude API
- その他のAI API

環境変数の設定例（`.env.local`を作成）：

```bash
# OpenAIを使用する場合
OPENAI_API_KEY=your-api-key-here

# Anthropic Claudeを使用する場合
ANTHROPIC_API_KEY=your-api-key-here
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
├── data/                       # 書籍の内容（.gitignoreに含まれる）
│   ├── README.md               # 書籍ファイル配置ガイド
│   └── book.txt                # 書籍の内容（ユーザーが配置）
├── lib/
│   ├── book-content.ts         # 書籍コンテンツ読み込みユーティリティ
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
