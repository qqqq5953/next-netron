import { NextRequest, NextResponse } from "next/server";
import { notFound } from 'next/navigation';
import { withDbConnection } from "@/lib/mysql";
import { Language } from "@/lib/definitions";
import { findCurrentLanguage } from "@/lib/utils";
import { RowDataPacket } from 'mysql2';
import { PoolConnection } from "mysql2/promise";

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
  const m_url = request.nextUrl.searchParams.get('m_url')
  const lang = findCurrentLanguage(request.nextUrl.searchParams.get('lang'))

  const baseQuery = `
    SELECT * FROM brands 
    WHERE m_url = ? and lang = ?;
  `;

  try {
    const [rows] = await withDbConnection(async (db: PoolConnection) => {
      const [rows] = await db.execute<RowDataPacket[]>(baseQuery, [m_url, lang]);
      return rows;
    });

    console.log('rows', rows);

    if (!rows) {
      return NextResponse.json({
        statusCode: 404,
        errorMsg: 'Page not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      statusCode: 200,
      data: rows
    });
  } catch (error) {
    console.log('brands error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch brand data'
    }, { status: 500 });
  }
}