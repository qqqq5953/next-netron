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

    const query = 'SELECT * FROM blogs WHERE lang = ?'
    const [rows] = await db.execute<RowDataPacket[]>(query, [lang])

    const result = {
      m_title: rows[0].m_title,
      m_keywords: rows[0].m_keywords,
      m_description: rows[0].m_description,
      m_url: rows[0].m_url,
      content: rows[0].content,
    }

    db.release()

    return NextResponse.json({
      statusCode: 200,
      data: result
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      error: 'Failed to fetch about data'
    }, { status: 500 })
  }
}