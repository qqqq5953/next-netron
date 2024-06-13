import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { RowDataPacket } from 'mysql2';
import { findCurrentLanguage, withDbConnection } from "@/lib/utils";
import { PoolConnection } from "mysql2/promise";

type QueryInfo = {
  baseQuery: string;
  countQuery: string;
  queryParams: any[];
  countParams: any[];
};


function buildQuery(lang: Language, categoryId: string | null, page: number): QueryInfo {
  const queryParams: any[] = [lang];
  const countParams: any[] = [lang];

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
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = params?.id?.[0];
  const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1', 10);
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang)

  try {
    const {
      baseQuery,
      countQuery,
      queryParams,
      countParams
    } = buildQuery(lang, categoryId, page);

    const { rows, count } = await withDbConnection(pool, async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
      const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);

      return { rows, count };
    });

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalNews,
        rows
      }
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      error: 'Failed to fetch news data'
    }, { status: 500 });
  }
}