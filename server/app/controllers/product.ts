import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

/**
 *クライアント側へ商品一覧情報を返却する関数
 */
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    // カテゴリごとの商品一覧情報をDBから取得する。
    const rawCategories = await prisma.category.findMany({
      select: {
        name: true,
        products: {
          where: {
            id: { //シードデータを除外(1~20)
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

    // rawCategoriesを加工する。商品の価格として、存在する容量のうち最も安い金額を設定する。
    const categories = rawCategories.map((c) => ({
      category: c.name,
      products: c.products.map((p) => ({
        id: p.id,
        thumbnailUrl: p.thumbnailUrl,
        name: p.name,
        description: p.description, //商品の概要
        intensity: p.intensity, //香りの強さ
        minPrice: Math.min(...p.volumes.map((v) => v.price)), //最低価格
      })),
    }));

    // クライアント側へ商品データを返却する。
    res.status(200).json(categories);
  } catch (error) {
    console.error("商品一覧情報の取得に失敗しました：", error);
    res.status(500).json({ message: "商品一覧情報の取得に失敗しました" });
  }
};

/**
 *クライアント側へ商品詳細情報を返却する関数
 */
export const getProduct = async (req: Request, res: Response) => {
  try {
    // クエリパラメータから詳細情報を表示したい商品のidを取得する。
    const productId = Number(req.params.id);
    if (Number.isNaN(productId)) {
      res.status(400).json({ message: "不適切な商品Idです。" });
      return;
    }

    // 取得したidに紐づく商品データをDBから取得する。
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        volumes: {
          include: {
            images: true,
          },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // クライアント側に商品データを返却する。
    if (!product) {
      console.error("商品が見つかりませんでした：", productId);
      res.status(404).json({ message: "商品が見つかりませんでした" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("商品詳細の取得に失敗しました：", error);
    res.status(500).json({ message: "商品情報の取得に失敗しました" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // ボディから商品情報を取得する。
    const {
      thumbnailUrl,
      name,
      description,
      detail,
      intensity,
      categoryId,
      volumes,
    } = req.body;

    if (
      !thumbnailUrl ||
      !name ||
      !description ||
      !detail ||
      !categoryId ||
      !volumes?.length
    ) {
      res.status(400).json({ message: "未入力の項目が含まれています" });
      return;
    }

    // 商品をdbに追加する。
    const product = await prisma.product.create({
      data: {
        thumbnailUrl,
        name,
        description,
        detail,
        intensity,
        categoryId,
        volumes: {
          create: volumes.map((v: any) => ({
            volume: v.volume,
            price: v.price,
            images: {
              create: v.images.map((img: any) => ({
                imageUrl: img.imageUrl,
              })),
            },
          })),
        },
      },
      include: {
        category: true,
        volumes: {
          include: { images: true },
        },
      },
    });


    res.status(201).json(product);
  } catch (error) {
    console.error("商品の作成に失敗しました：", error);
    res.status(500).json({ message: "商品の作成に失敗しました" });
  }
};
