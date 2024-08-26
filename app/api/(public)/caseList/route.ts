import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage, isInvalidPageNumber } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";

type QueryInfo = {
  baseQuery: string;
  countQuery: string;
  queryParams: any[];
  countParams: any[];
};

const PER_PAGE = 12;
const CID_MAPPING: Record<Language, number[]> = {
  tw: [3, 14],
  en: [7],
  cn: [6],
};

function buildQuery(lang: Language, categoryId: string | null, page: number): QueryInfo {
  const cids = categoryId ? null : CID_MAPPING[lang];

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
  } else if (cids) {
    // tab 選全部時
    baseQuery += ` AND cid IN (${cids.join(", ")})`;
    countQuery += ` AND cid IN (${cids.join(", ")})`;
  }

  const offset = (page - 1) * PER_PAGE;
  baseQuery += ` ORDER BY sort DESC LIMIT ${PER_PAGE} OFFSET ?`;
  queryParams.push(offset);

  return {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  };
};

async function getPaginatedCases(lang: Language, categoryId: string | null, page: number) {
  const {
    baseQuery,
    countQuery,
    queryParams,
    countParams
  } = buildQuery(lang, categoryId, page);

  const [rows, count] = await withDbConnection(async (db: PoolConnection) => {
    const [rows] = await db.execute<RowDataPacket[]>(baseQuery, queryParams);
    const [count] = await db.execute<RowDataPacket[]>(countQuery, countParams);
    return [rows, count];
  });

  return [rows, count]
}

export async function GET(
  request: NextRequest,
) {
  try {
    const { searchParams } = request.nextUrl
    const lang = findCurrentLanguage(searchParams.get('lang'))
    const page = searchParams.get('page')
    const validPageNumber = isInvalidPageNumber(page) ? 1 : parseInt(page!, 10)

    const categoriesQuery = `
      SELECT id FROM categories 
      WHERE lang = ? AND type = "case";
    `;

    const [categories] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(categoriesQuery, [lang]);

      return [rows];
    });

    const categoryId = categories.length ? categories[0].id : null;

    const [rows, [count]] = await getPaginatedCases(lang, categoryId, validPageNumber)

    return NextResponse.json({
      statusCode: 200,
      data: {
        total: count.totalNews,
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