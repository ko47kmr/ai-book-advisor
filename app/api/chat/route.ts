import { NextRequest, NextResponse } from "next/server";
import { ChatRequest, ChatResponse } from "@/lib/types";

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

    // モックレスポンス（実際のAI連携時はここを置き換える）
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
