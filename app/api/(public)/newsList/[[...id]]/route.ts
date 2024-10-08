import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

type QueryInfo = {
  categoriesQuery: string,
  baseQuery: string;
  countQuery: string;
  queryParams: any[];
  countParams: any[];
};

function buildQuery(lang: Language, categoryId: string | null, page: number): QueryInfo {
  const queryParams: any[] = [lang];
  const countParams: any[] = [lang];

  const categoriesQuery = `
    SELECT title FROM categories 
    WHERE id = ?;
  `;

  let baseQuery = `
    SELECT * FROM news 
    WHERE lang = ? AND type = "news"
  `;

  let countQuery = `
    SELECT COUNT(*) AS totalNews FROM news 
    WHERE lang = ? AND type = "news"
  `;

  if (categoryId) {
    baseQuery += ` AND cid = ?`;
    countQuery += ` AND cid = ?`;
    queryParams.push(categoryId);
    countParams.push(categoryId);
  } else {
    baseQuery += ` AND cid IN (2, 5, 9)`;
    countQuery += ` AND cid IN (2, 5, 9)`;
  }

  baseQuery += `
    ORDER BY sort DESC
    LIMIT 10 
    OFFSET ?
  `;

  const PER_PAGE = 10
  const offset = (page - 1) * PER_PAGE;
  queryParams.push(offset);

  return {
    categoriesQuery,
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

async function getPaginatedNews(lang: Language, categoryId: string | null, page: string | null) {
  const {
    categoriesQuery,
    baseQuery,
    countQuery,
    queryParams,
    countParams
  } = buildQuery(lang, categoryId, parseInt(page ?? "1", 10));

  const [rows, count, categoryTitle] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
    const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);
    const [categoryTitle] = await db.execute<RowDataPacket[]>(categoriesQuery, [categoryId]);

    return [rows, count, categoryTitle];
  });

  return [rows, count, categoryTitle]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = params?.id?.[0];
  const page = request.nextUrl.searchParams.get('page')
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  try {
    const [rows, count, categoryTitle] = await getPaginatedNews(lang, categoryId, page)

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalNews,
        title: categoryTitle[0].title,
        rows
      }
    });
  } catch (error) {
    console.log('news error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch news data'
    }, { status: 500 });
  }
}