import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { PoolConnection } from "mysql2/promise";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('adminLang')
  const lang = findCurrentLanguage(adminLang)
  const query = 'SELECT * FROM blogs WHERE lang = ?'

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(query, [lang])
      return [rows];
    });

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

export async function PUT(
  request: NextRequest,
) {
  const updateQuery = `
    UPDATE blogs 
    SET m_title = ?, 
    m_keywords = ?, 
    m_description = ?,
    m_url = ?, 
    content = ?
    WHERE id = ?;
  `;

  try {
    const {
      metaTitle,
      metaKeyword,
      metaDescription,
      customizedLink,
      content,
      id,
    } = await request.json();

    const [updated] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(updateQuery, [
        metaTitle,
        metaKeyword,
        metaDescription,
        customizedLink,
        content,
        id
      ]);
    });

    const { affectedRows, changedRows } = updated

    if (changedRows === 0) {
      return NextResponse.json({
        statusCode: 204,
        msg: "Update successful but no rows were changed",
        data: null
      })
    } else if (affectedRows === changedRows) {
      return NextResponse.json({
        statusCode: 200,
        msg: "Update successful. All matched rows were modified.",
        data: null
      })
    } else {
      return NextResponse.json({
        statusCode: 200,
        msg: "Update partially successful",
        data: {
          affectedRows,
          changedRows
        }
      })
    }
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to update about info'
    }, { status: 500 });
  }

}