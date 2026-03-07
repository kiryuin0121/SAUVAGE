import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCategory = async (req: Request, res: Response) => {
  // カテゴリidを取得
  const categoryId = Number(req.params.id);
  if (Number.isNaN(categoryId)) {
    res.status(400).json({ message: "不適切なカテゴリIdです。" });
    return;
  }
  const existsCategory = !!(await prisma.category.findFirst({
    where: { id: categoryId },
    select: { id: true },
  }));
  if (!existsCategory) {
    res.status(400).json({ message: "不適切なカテゴリIdです。" });
    return;
  }
  // 指定したカテゴリの商品データを取得
  try {
    // カテゴリごとの商品一覧情報をDBから取得する。
    const rawProducts = await prisma.category.findFirst({
      where: { id: categoryId },
      select: {
        name: true,
        products: {
          where: {
            id: {
              //シードデータを除外(1~20)
              gte: 21,
            },
          },
          select: {
            id: true,
            thumbnailUrl: true,
            name: true,
            description: true,
            intensity: true,
            volumes: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });
    if (!rawProducts) {
      res.status(400).json({ message: "商品データが存在しませんでした。" });
      return;
    }
    // rawProductsを加工する。商品の価格として、存在する容量のうち最も安い金額を設定する。
    const products = rawProducts.products.map((p) => ({
      id: p.id,
      thumbnailUrl: p.thumbnailUrl,
      name: p.name,
      description: p.description, //商品の概要
      intensity: p.intensity, //香りの強さ
      minPrice: Math.min(...p.volumes.map((v) => v.price)), //最低価格
    }));

    // クライアント側へ商品データを返却する。
    res.status(200).json(products);
  } catch (error) {
    console.error("商品一覧情報の取得に失敗しました：", error);
    res.status(500).json({ message: "商品一覧情報の取得に失敗しました" });
  }
};
