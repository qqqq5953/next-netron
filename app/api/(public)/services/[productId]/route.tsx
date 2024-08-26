import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";
import { ProducTableData } from "@/lib/definitions";

export async function GET(
  request: NextRequest,
  { params }: {
    params: {
      productId: string
    }
  }
) {
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'));
  const productId = params.productId
  const productsQuery = 'SELECT * FROM products WHERE lang = ? AND id = ?';

  try {
    const [data] = await withDbConnection(async (db: PoolConnection) => {
      const [products] = await db.execute<RowDataPacket[]>(productsQuery, [lang, productId]);

      const promise = products.map(async (product) => {
        if ([3, 7, 28].includes(product.id)) {
          // Brand 雲端品牌
          return await getBrands(db, product)
        } else if ([4, 6, 27].includes(product.id)) {
          // Cloud 雲端服務
          return await getProducts(db, product)
        } else {
          return {}
        }
      })

      const productsWithItems = await Promise.all(promise)
      return productsWithItems
    });

    return NextResponse.json({
      statusCode: 200,
      data: data
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch product data'
    }, { status: 500 });
  }
}

async function getBrands(db: PoolConnection, product: RowDataPacket) {
  const brandListArray = product.brandList?.split(',').map(Number) ?? [];

  if (brandListArray.length === 0) {
    return {
      ...product,
      newsList: product.newsList?.split(',').map(Number) ?? [],
      brandItems: []
    };
  }

  // Dynamically create placeholders for the brandListArray
  const placeholders = brandListArray.map(() => '?').join(',');

  const brandQuery = `
    SELECT id, title, img, m_url
    FROM brands
    WHERE id IN (${placeholders});
  `;

  const [brandItems] = await db.execute<RowDataPacket[]>(brandQuery, brandListArray);

  return {
    ...product,
    newsList: product.newsList?.split(',').map(Number) ?? [],
    brandItems
  };
}

async function getProducts(db: PoolConnection, product: RowDataPacket) {
  const productItemsQuery = 'SELECT * FROM product_items WHERE pid = ?';
  const [productItems] = await db.execute<RowDataPacket[]>(productItemsQuery, [product.id]);

  return {
    ...product,
    newsList: product.newsList?.split(',').map(Number) ?? [],
    productItems
  }
}