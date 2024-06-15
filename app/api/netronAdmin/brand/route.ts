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

function buildQuery(lang: Language, page: number): QueryInfo {
  const baseQuery = `
    SELECT * FROM brands 
    WHERE lang = ?
    ORDER BY sort DESC
    LIMIT 10 
    OFFSET ?
  `;

  const countQuery = `SELECT COUNT(*) AS totalBrands FROM brands WHERE lang = ?`;

  const PER_PAGE = 10
  const offset = (page - 1) * PER_PAGE;

  const queryParams: any[] = [lang, offset];
  const countParams: any[] = [lang];

  return {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

export async function GET(
  request: NextRequest,
) {
  const page = parseInt(request.nextUrl.searchParams.get('page') ?? '1', 10);
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang)

  try {
    const {
      baseQuery,
      countQuery,
      queryParams,
      countParams
    } = buildQuery(lang, page);

    const [rows, count] = await withDbConnection(pool, async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
      const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);

      return [rows, count];
    });

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalBrands,
        rows
      }
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch news data'
    }, { status: 500 });
  }
}