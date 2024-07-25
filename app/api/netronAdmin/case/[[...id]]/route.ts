import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage, isInvalidPageNumber } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";

type QueryInfo = {
  baseQuery: string;
  countQuery: string;
  queryParams: any[];
  countParams: any[];
};

function buildQuery(lang: Language, categoryId: string | null, page: number): QueryInfo {
  const queryParams: any[] = [lang];
  const countParams: any[] = [lang];

  let baseQuery = `
    SELECT * FROM news 
    WHERE lang = ? AND type = "case"
  `;

  let countQuery = `
    SELECT COUNT(*) AS totalNews FROM news 
    WHERE lang = ? AND type = "case"
  `;

  if (categoryId) {
    baseQuery += ` AND cid = ?`;
    countQuery += ` AND cid = ?`;
    queryParams.push(categoryId);
    countParams.push(categoryId);
  } else {
    // tab 選全部時
    if (lang === 'tw') {
      baseQuery += ` AND cid IN (3, 14)`;
      countQuery += ` AND cid IN (3, 14)`;
    } else if (lang === 'en') {
      baseQuery += ` AND cid IN (7)`;
      countQuery += ` AND cid IN (7)`;
    } else {
      baseQuery += ` AND cid IN (6)`;
      countQuery += ` AND cid IN (6)`;
    }
  }

  baseQuery += `
    ORDER BY sort DESC
    LIMIT 10 
    OFFSET ?
  `;

  const PER_PAGE = 10
  const offset = (page - 1) * PER_PAGE;
  queryParams.push(offset);

  return {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

async function getPaginatedCases(lang: Language, categoryId: string | null, page: string | null) {
  const {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  } = buildQuery(lang, categoryId, parseInt(page ?? "1", 10));

  const [rows, count] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
    const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);
    return [rows, count];
  });

  return [rows, count]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const categoryId = params?.id?.[0];
  const page = request.nextUrl.searchParams.get('page')
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang)

  try {
    const [rows, count] = await getPaginatedCases(lang, categoryId, page)

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count[0].totalNews,
        rows
      }
    });
  } catch (error) {
    console.log('cases error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch cases data'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
) {
  const updateQuery = `
    UPDATE news 
    SET m_title = ?,
    m_keywords = ?,
    m_description = ?,
    m_url = ?,
    updated_at = ?,
    description = ?,
    cid = ?,
    title = ?,
    img = ?,
    content = ?
    WHERE id = ?;
  `;

  try {
    const data = await request.json();

    const {
      id,
      m_title,
      m_keywords,
      m_description,
      m_url,
      updated_at,
      cid,
      title,
      description,
      img,
      content
    } = data

    const [updated] = await withDbConnection(async (db: PoolConnection) => {
      return db.execute<ResultSetHeader>(updateQuery, [
        m_title,
        m_keywords,
        m_description,
        m_url,
        updated_at,
        description,
        cid,
        title,
        img,
        content,
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
      errorMsg: 'Failed to update news'
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
) {
  const createQuery = `
    INSERT INTO news (
      title,
      cid,
      description,
      img,
      content,
      lang,
      status,
      sort,
      m_title,
      m_keywords,
      m_description,
      m_url,
      edit_at,
      post_date,
      created_at,
      updated_at,
      \`show\`,
      type,
      mode,
      location,
      county,
      street,
      lecturer,
      start_at,
      end_at,
      price,
      currency,
      soldout_at,
      website,
      hostCompany,
      hostWeb
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const maxSortQuery = 'SELECT MAX(sort) AS max_sort_value FROM news where type = "case" and lang = ?';

  try {
    const {
      m_title,
      m_keywords,
      m_description,
      m_url,
      updated_at,
      created_at,
      cid,
      title,
      description,
      lang,
      img,
      content,
    } = await request.json();

    const [created] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(maxSortQuery, [lang]);
      const sort_value = rows[0].max_sort_value + 1

      return await db.execute<ResultSetHeader>(createQuery, [
        title,
        cid,
        description, // description
        img,
        content,
        lang,
        1, // status
        sort_value, // sort
        m_title,
        m_keywords,
        m_description,
        m_url,
        (new Date()).toLocaleDateString('zh-TW'), // edit_at,
        null, // post_date
        created_at,
        updated_at,
        1, // show,
        "case", // type,
        null, // mode,
        null, // location,
        null, // county,
        null, // street,
        null, // lecturer,
        null, // start_at,
        null, // end_at,
        null, // price,
        null, // currency,
        null, // soldout_at,
        null, // website,
        null, // hostCompany,
        null, // hostWeb
      ]);
    });

    console.log('created', created);

    return NextResponse.json({
      statusCode: 200,
      msg: "News article created successfully.",
      data: null
    })
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to create news article'
    }, { status: 500 });
  }

}

export async function DELETE(
  request: NextRequest,
) {
  const deleteQuery = `DELETE FROM news WHERE id = ? AND type = "case";`;

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