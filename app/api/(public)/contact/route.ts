import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";

export async function GET(
  request: NextRequest,
) {
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  const profilesQuery = `SELECT * FROM profiles WHERE lang = ?;`;

  try {
    const [profiles] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(profilesQuery, [lang]);

      return rows;
    });

    console.log('profiles', profiles);


    return NextResponse.json({
      statusCode: 200,
      data: profiles
    });
  } catch (error) {
    console.log('brands error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch brand data'
    }, { status: 500 });
  }
}