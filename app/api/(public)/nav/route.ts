import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";
import { Language } from "@/lib/definitions";

export async function GET(
  request: NextRequest,
) {
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  const aboutQuery = `
    SELECT title, m_url FROM blogs 
    WHERE lang = ?
    ORDER BY sort DESC;
  `;

  const categoriesQuery = `
    SELECT title, type, lang, id FROM categories 
    WHERE lang = ? AND type = "news"
    ORDER BY sort DESC;
  `;

  const casesQuery = `
    SELECT title, type, lang, id FROM categories 
    WHERE lang = ? AND type = "case"
    ORDER BY sort DESC;
  `;

  const productsQuery = `
    SELECT title, lang, id, m_url FROM products 
    WHERE lang = ?
    ORDER BY sort DESC;
  `;

  try {
    const [about, categories, cases, products] = await withDbConnection(async (db: PoolConnection) => {
      const [about] = await db.execute<RowDataPacket[]>(aboutQuery, [lang]);
      const [categories] = await db.execute<RowDataPacket[]>(categoriesQuery, [lang]);
      const [cases] = await db.execute<RowDataPacket[]>(casesQuery, [lang]);
      const [products] = await db.execute<RowDataPacket[]>(productsQuery, [lang]);

      return [about, categories, cases, products];
    });

    // console.log('about', about);
    console.log('categories', categories);
    console.log('cases', cases);
    console.log('products', products);


    // if (rows.length === 0) {
    //   return NextResponse.json({
    //     statusCode: 404,
    //     errorMsg: 'Resource not found'
    //   }, { status: 404 });
    // }

    return NextResponse.json({
      statusCode: 200,
      data: {
        about,
        categories,
        cases,
        products
      }
    });
  } catch (error) {
    console.log('brands error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch brand data'
    }, { status: 500 });
  }
}