import fs from "fs";
import path from "path";

/**
 * 書籍の内容を読み込む
 * data/ディレクトリから書籍ファイルを読み込みます
 */
export function loadBookContent(): string {
  try {
    const bookPath = path.join(process.cwd(), "data", "book.txt");

    // ファイルが存在しない場合はデフォルトメッセージを返す
    if (!fs.existsSync(bookPath)) {
      console.warn("書籍ファイルが見つかりません: data/book.txt");
      return "書籍の内容がまだ読み込まれていません。";
    }

    const content = fs.readFileSync(bookPath, "utf-8");
    return content;
  } catch (error) {
    console.error("書籍ファイルの読み込みに失敗しました:", error);
    return "";
  }
}

/**
 * 複数の書籍ファイルを読み込む（章ごとに分割されている場合など）
 */
export function loadBookChapters(): Record<string, string> {
  try {
    const dataDir = path.join(process.cwd(), "data");

    if (!fs.existsSync(dataDir)) {
      console.warn("dataディレクトリが見つかりません");
      return {};
    }

    const files = fs.readdirSync(dataDir);
    const chapters: Record<string, string> = {};

    files.forEach((file) => {
      if (file.endsWith(".txt") || file.endsWith(".md")) {
        const filePath = path.join(dataDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const chapterName = file.replace(/\.(txt|md)$/, "");
        chapters[chapterName] = content;
      }
    });

    return chapters;
  } catch (error) {
    console.error("章ファイルの読み込みに失敗しました:", error);
    return {};
  }
}
