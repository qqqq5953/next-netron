import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
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
    WHERE lang = ? AND type = "case"
  `;

  let countQuery = `
    SELECT COUNT(*) AS totalNews FROM news 
    WHERE lang = ? AND type = "case"
  `;

  if (categoryId) {
    baseQuery += ` AND cid = ?`;
    countQuery += ` AND cid = ?`;
    queryParams.push(categoryId);
    countParams.push(categoryId);
  } else {
    // tab 選全部時
    if (lang === 'tw') {
      baseQuery += ` AND cid IN (3, 14)`;
      countQuery += ` AND cid IN (3, 14)`;
    } else if (lang === 'en') {
      baseQuery += ` AND cid IN (7)`;
      countQuery += ` AND cid IN (7)`;
    } else {
      baseQuery += ` AND cid IN (6)`;
      countQuery += ` AND cid IN (6)`;
    }
  }

  baseQuery += `
    ORDER BY sort DESC
    LIMIT 12
    OFFSET ?
  `;

  const PER_PAGE = 12
  const offset = (page - 1) * PER_PAGE;
  queryParams.push(offset);

  return {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

async function getPaginatedCases(lang: Language, categoryId: string | null, page: string | null) {
  const {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  } = buildQuery(lang, categoryId, parseInt(page ?? "1", 10));

  const [rows, count] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
    const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);
    return [rows, count];
  });

  return [rows, count]
}

export async function GET(
  request: NextRequest,
) {
  const page = request.nextUrl.searchParams.get('page')
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  try {
    const [rows, count] = await getPaginatedCases(lang, "3", page)

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalNews,
        rows
      }
    });
  } catch (error) {
    console.log('cases error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch cases data'
    }, { status: 500 });
  }
}