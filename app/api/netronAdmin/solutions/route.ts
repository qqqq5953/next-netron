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
  const solutionQuery = 'SELECT * FROM solutions WHERE lang = ?';

  try {
    const data = await withDbConnection(pool, async (db: PoolConnection) => {
      const [solutions] = await db.execute<RowDataPacket[]>(solutionQuery, [lang]);

      return solutions.map(solution => {
        return {
          ...solution,
          newsList: solution.newsList?.split(',').map(Number) ?? [],
        }
      })
    });

    return NextResponse.json({
      statusCode: 200,
      data: data
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch solution data'
    }, { status: 500 });
  }
}