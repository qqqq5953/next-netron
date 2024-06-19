import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";
import pool from "@/lib/mysql";
import { findCurrentLanguage, withDbConnection } from "@/lib/utils";

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang);
  const productsQuery = 'SELECT * FROM products WHERE lang = ?';
  const productItemsQuery = 'SELECT * FROM product_items WHERE pid = ?';

  try {
    const data = await withDbConnection(pool, async (db: PoolConnection) => {
      const [products] = await db.execute<RowDataPacket[]>(productsQuery, [lang]);

      const promise = products.map(async (product) => {
        const [productItems] = await db.execute<RowDataPacket[]>(productItemsQuery, [product.id]);

        return {
          ...product,
          brandList: product.brandList?.split(',').map(Number) ?? [],
          newsList: product.newsList?.split(',').map(Number) ?? [],
          productItems
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