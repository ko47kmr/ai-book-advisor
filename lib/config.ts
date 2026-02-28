export const config = {
  // サービス名（ヘッダーに表示）
  serviceName: "書籍名 AIアドバイザー",

  // 書籍購入ページのURL
  bookPurchaseUrl: "https://example.com/book",

  // AIの初期挨拶メッセージ
  initialMessage: "こんにちは！私は書籍の内容をベースにしたAIアドバイザーです。あなたのビジネスに関する悩みや質問をお聞かせください。",

  // 免責事項
  disclaimer: "※本サービスはAIによる回答であり、内容の正確性を保証するものではありません。最終的な判断はご自身で行ってください。",

  // localStorageのキー名
  storageKey: "ai-book-advisor-chat-history",
} as const;
