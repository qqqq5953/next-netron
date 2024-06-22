import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage, isInvalidPageNumber } from "@/lib/utils";
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
    baseQuery += ` AND cid IN (3, 14)`;
    countQuery += ` AND cid IN (3, 14)`;
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
  { params }: { params: { id: string } }
) {
  const categoryId = params?.id?.[0];
  const page = request.nextUrl.searchParams.get('page')
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang)

  try {
    const [rows, count] = await getPaginatedCases(lang, categoryId, page)

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