import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { RowDataPacket } from 'mysql2';

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('adminLang')

  try {
    const db = await pool.getConnection()

    let lang: Language = "tw"

    if (adminLang && ["tw", "en", "cn"].includes(adminLang)) {
      lang = adminLang as Language
    }

    const query = 'SELECT * FROM categories WHERE lang = ? AND type = "news"'
    const [rows] = await db.execute<RowDataPacket[]>(query, [lang])

    db.release()

    return NextResponse.json({
      statusCode: 200,
      data: rows
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      error: 'Failed to fetch category news data'
    }, { status: 500 })
  }
}