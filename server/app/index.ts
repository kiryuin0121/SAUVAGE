import express, { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routes/product";
import reviewRouter from "./routes/review";
import categoryRouter from "./routes/category";
// ----------expressインスタンスを生成----------
const app = express();

// ----------ミドルウェアを登録----------

// JSON形式でデータのやり取りを行う。
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// クライアント側との通信を許可する。(http://localhost:5173)
app.use(cors());

//----------各リソースごとのルートハンドラーを登録----------
app.use("/api/products", productRouter); //商品情報api
app.use("/api/reviews", reviewRouter); //商品レビューapi
app.use("/api/categories",categoryRouter);//カテゴリごとの商品データapi

// ----------expressサーバーを起動 (http://localhost:8080)----------

const PORT = 8080;
app.listen(PORT, () => {
  // ターミナルの文字色
  const WHITE = "\x1b[0m";
  const GRAY = "\x1b[90m";
  const GREEN = "\x1b[32m";
  const MAGENTA = "\x1b[35m";

  // ターミナルのログ
  console.log("");
  console.log(`${GREEN}  Express v5.2.1${WHITE}`);
  console.log("");
  console.log(
    `${GREEN}  ➜${WHITE}  Local:   ${MAGENTA}http://localhost:${PORT}/${WHITE}`,
  );
  console.log(
    `${GREEN}  ➜${WHITE}  API:     ${GRAY}http://localhost:${PORT}/api${WHITE}`,
  );
});
