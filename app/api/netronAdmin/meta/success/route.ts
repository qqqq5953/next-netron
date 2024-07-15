import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('adminLang')
  const lang = findCurrentLanguage(adminLang)
  const query = 'SELECT * FROM metas WHERE lang = ? AND type = "success"'

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(query, [lang])
      return [rows];
    });

    return NextResponse.json({
      statusCode: 200,
      data: {
        id: rows[0].id,
        type: rows[0].type,
        m_title: rows[0].m_title,
        m_keywords: rows[0].m_keywords,
        m_description: rows[0].m_description,
      }
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch meta data'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
) {
  const updateQuery = `
    UPDATE metas 
    SET m_title = ?,
    m_keywords = ?,
    m_description = ?
    WHERE id = ? and type = ?;
  `;

  try {
    const {
      id,
      type,
      m_title,
      m_keywords,
      m_description
    } = await request.json();

    const [updated] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(updateQuery, [
        m_title,
        m_keywords,
        m_description,
        id,
        type
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
      errorMsg: 'Failed to update meta success'
    }, { status: 500 });
  }

}