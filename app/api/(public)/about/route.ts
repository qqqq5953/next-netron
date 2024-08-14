import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('lang')
  const lang = findCurrentLanguage(adminLang)
  const query = 'SELECT * FROM blogs WHERE lang = ?'

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(query, [lang])
      return [rows];
    });

    // console.log('rows', rows);


    return NextResponse.json({
      statusCode: 200,
      data: {
        id: rows[0].id,
        m_title: rows[0].m_title,
        m_keywords: rows[0].m_keywords,
        m_description: rows[0].m_description,
        m_url: rows[0].m_url,
        content: rows[0].content,
      }
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch about data'
    }, { status: 500 })
  }
}