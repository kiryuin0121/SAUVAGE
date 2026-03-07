import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createReview = async (req: Request, res: Response) => {
  try {
    const reviews = Array.isArray(req.body) ? req.body : [req.body];

   
    for (const review of reviews) {
      const { productId, rating, authorName, title, content } = review;

      if (
        !productId ||
        !authorName ||
        !title ||
        !content ||
        typeof rating !== "number" ||
        rating < 1 ||
        rating > 5
      ) {
        return res.status(400).json({
          message: "入力値が不正です。",
        });
      }

      const existProduct = await prisma.product.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!existProduct) {
        return res.status(400).json({
          message: `商品ID ${productId} は存在しません。`,
        });
      }
    }

    const result = await prisma.review.createMany({
      data: reviews.map((r) => ({
        productId: r.productId,
        rating: r.rating,
        authorName: r.authorName,
        title: r.title,
        content: r.content,
      })),
    });

    return res.status(201).json({
      message: "レビューを作成しました。",
      count: result.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "サーバーエラー" });
  }
};
