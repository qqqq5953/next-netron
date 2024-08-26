import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";

export async function GET(
  request: NextRequest,
) {
  const m_url = request.nextUrl.searchParams.get('m_url')
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  const baseQuery = `
    SELECT * FROM brands 
    WHERE m_url = ? and lang = ?;
  `;

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(baseQuery, [m_url, lang]);
      return rows;
    });

    if (!rows) {
      return NextResponse.json({
        statusCode: 404,
        errorMsg: 'Page not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      statusCode: 200,
      data: rows
    });
  } catch (error) {
    console.log('brands error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch brand data'
    }, { status: 500 });
  }
}