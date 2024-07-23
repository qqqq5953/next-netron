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
  const query = 'SELECT * FROM categories WHERE lang = ? AND type = "news"'

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(query, [lang])
      return [rows];
    });

    return NextResponse.json({
      statusCode: 200,
      data: rows
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch category news data'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
) {
  const updateQuery = `
    UPDATE categories 
    SET title = ?,
    updated_at = ?
    WHERE id = ?;
  `;

  try {
    const { title, id, updated_at } = await request.json();
    const [updated] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(updateQuery, [
        title,
        updated_at,
        id,
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

export async function DELETE(
  request: NextRequest,
) {
  const deleteQuery = `DELETE FROM categories WHERE id = ? AND type = "news";`;

  try {
    const { id } = await request.json();

    const [deleted] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(deleteQuery, [id]);
    });

    if (deleted.affectedRows > 0) {
      return NextResponse.json({
        statusCode: 200,
        msg: "Delete successful",
        data: null
      })
    } else {
      return NextResponse.json({
        statusCode: 404,
        errorMsg: "Resource not found"
      }, { status: 404 });
    }
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to update successful case'
    }, { status: 500 });
  }
}