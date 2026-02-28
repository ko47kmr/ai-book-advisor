import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/lib/types";
// import { loadBookContent } from "@/lib/book-content"; // 書籍の内容を読み込む場合

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history } = body;

    // バリデーション
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "メッセージが無効です" },
        { status: 400 }
      );
    }

    // ========================================
    // 実際のAI APIとの連携例（コメントアウト）
    // ========================================

    /*
    // 1. 書籍の内容を読み込む
    const bookContent = loadBookContent();

    // 2. システムプロンプトを作成
    const systemPrompt = `
あなたは書籍「〇〇〇」の内容に基づいてアドバイスを提供するAIアシスタントです。
以下の書籍の内容を参考にして、ユーザーの質問に答えてください。

【書籍の内容】
${bookContent}

【重要な指示】
- 書籍の内容に基づいた具体的なアドバイスを提供してください
- 書籍に記載されていない内容については、一般的なビジネスアドバイスとして回答してください
- 丁寧で親しみやすいトーンで回答してください
`.trim();

    // 3. OpenAI APIの例
    // const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4",
    //     messages: [
    //       { role: "system", content: systemPrompt },
    //       ...history,
    //       { role: "user", content: message },
    //     ],
    //     temperature: 0.7,
    //   }),
    // });
    // const data = await openaiResponse.json();
    // const response = data.choices[0].message.content;

    // 4. Anthropic Claude APIの例
    // const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-api-key": process.env.ANTHROPIC_API_KEY || "",
    //     "anthropic-version": "2023-06-01",
    //   },
    //   body: JSON.stringify({
    //     model: "claude-3-5-sonnet-20241022",
    //     max_tokens: 1024,
    //     system: systemPrompt,
    //     messages: [
    //       ...history.map((msg) => ({ role: msg.role, content: msg.content })),
    //       { role: "user", content: message },
    //     ],
    //   }),
    // });
    // const data = await anthropicResponse.json();
    // const response = data.content[0].text;
    */

    // ========================================
    // モックレスポンス（開発・テスト用）
    // ========================================
    const mockResponses = [
      "ご質問ありがとうございます。書籍の第3章で述べているように、その課題に対しては段階的なアプローチが有効です。",
      "興味深いご質問ですね。この件については、書籍で紹介している「3つの原則」を適用することをお勧めします。",
      "なるほど、その悩みはよく理解できます。書籍の実践例でも同様のケースを取り上げていますが、まずは優先順位を明確にすることから始めましょう。",
      "良いご質問です。その状況では、書籍の第5章で解説している「フレームワーク」を活用すると効果的です。",
    ];

    // ランダムにモックレスポンスを選択
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    const response = mockResponses[randomIndex];

    // 少し遅延を入れて、実際のAPI呼び出しをシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const chatResponse: ChatResponse = {
      response,
    };

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
