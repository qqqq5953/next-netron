import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

type QueryInfo = {
  baseQuery: string;
  countQuery: string;
  baseParams: any[];
  countParams: any[];
};

function buildQuery(lang: Language, page: number): QueryInfo {
  const baseQuery = `
    SELECT * FROM brands 
    WHERE lang = ?
    ORDER BY sort DESC
    LIMIT 10 
    OFFSET ?
  `;

  const countQuery = `SELECT COUNT(*) AS totalBrands FROM brands WHERE lang = ?`;

  const PER_PAGE = 10
  const offset = (page - 1) * PER_PAGE;

  const baseParams: any[] = [lang, offset];
  const countParams: any[] = [lang];

  return {
    baseQuery,
    countQuery,
    baseParams,
    countParams
  };
};

async function getPaginatedBrands(lang: Language, page: string | null) {
  const {
    baseQuery,
    countQuery,
    baseParams,
    countParams
  } = buildQuery(lang, parseInt(page ?? "1", 10));

  const [rows, count] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, baseParams);
    const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);

    return [rows, count];
  });

  return [rows, count];
}

async function getAllBrandsWithIdAndTitle(lang: Language) {
  const baseQuery = `SELECT id, title FROM brands ORDER BY sort DESC`;
  const baseParams: any[] = [lang];
  const [rows, count] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, baseParams);
    const count = [{ totalBrands: rows.length }]
    return [rows, count];
  });

  return [rows, count];
}

export async function GET(
  request: NextRequest,
) {
  const page = request.nextUrl.searchParams.get('page')
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang)

  try {
    const [rows, count] = page === 'all' ?
      await getAllBrandsWithIdAndTitle(lang) :
      await getPaginatedBrands(lang, page)

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalBrands,
        rows
      }
    });
  } catch (error) {
    console.log('brands error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch brand data'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
) {
  const updateQuery = `
    UPDATE brands 
    SET m_title = ?,
    m_keywords = ?,
    m_description = ?,
    m_url = ?,
    title = ?,
    content = ?,
    updated_at = ?,
    img = ?
    WHERE id = ?;
  `;

  try {
    const {
      m_title,
      m_keywords,
      m_description,
      m_url,
      title,
      content,
      img,
      updated_at,
      id,
    } = await request.json();
    const [updated] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(updateQuery, [
        m_title,
        m_keywords,
        m_description,
        m_url,
        title,
        content,
        updated_at,
        img,
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

export async function POST(
  request: NextRequest,
) {
  const createQuery = `
    INSERT INTO brands (
      title,
      img,
      sort, 
      content,
      m_url,
      lang,
      edit_at,
      created_at,
      updated_at,
      m_title,
      m_description,
      m_keywords
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const maxSortQuery = 'SELECT MAX(sort) AS max_sort_value FROM brands';

  try {
    const {
      m_title,
      m_keywords,
      m_description,
      m_url,
      title,
      content,
      img,
      lang,
      updated_at,
      created_at,
      edit_at,
    } = await request.json();

    const [created] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(maxSortQuery);
      const sort_value = rows[0].max_sort_value + 1

      return await db.execute<ResultSetHeader>(createQuery, [
        title,
        img,
        sort_value, // sort, 
        content,
        m_url,
        lang,
        edit_at,  //edit_at,
        created_at,
        updated_at,
        m_title,
        m_description,
        m_keywords,
      ]);
    });

    console.log('created', created);

    return NextResponse.json({
      statusCode: 200,
      msg: "Brand created successfully.",
      data: null
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to update brand info'
    }, { status: 500 });
  }

}

export async function DELETE(
  request: NextRequest,
) {
  const deleteQuery = `DELETE FROM brands WHERE id = ?;`;

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