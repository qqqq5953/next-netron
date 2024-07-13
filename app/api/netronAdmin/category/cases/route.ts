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
  const query = `
    SELECT * FROM categories 
    WHERE lang = ? AND type = "case"
    ORDER BY sort DESC
  `

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
      errorMsg: 'Failed to fetch category case data'
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
      errorMsg: 'Failed to update successful case'
    }, { status: 500 });
  }

}

export async function POST(
  request: NextRequest,
) {
  const createQuery = `
    INSERT INTO categories (
      title, 
      type,
      sort,
      lang, 
      created_at, 
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const maxSortQuery = 'SELECT MAX(sort) AS max_sort_value FROM categories';

  try {
    const {
      title,
      type,
      lang,
      created_at,
      updated_at
    } = await request.json();

    const [created] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(maxSortQuery);
      const sort_value = rows[0].max_sort_value + 1

      return db.execute<ResultSetHeader>(createQuery, [
        title,
        type,
        sort_value, // sort
        lang,
        created_at,
        updated_at
      ]);
    });

    console.log('created', created);

    return NextResponse.json({
      statusCode: 200,
      msg: "Case created successfully.",
      data: null
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to update successful case'
    }, { status: 500 });
  }

}