import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { withDbConnection } from "@/lib/mysql";
import { findCurrentLanguage } from "@/lib/utils";
import { ProducTableData } from "@/lib/definitions";

export async function GET(
  request: NextRequest,
) {
  const adminLang = request.nextUrl.searchParams.get('adminLang');
  const lang = findCurrentLanguage(adminLang);
  const productsQuery = 'SELECT * FROM products WHERE lang = ?';
  const productItemsQuery = 'SELECT * FROM product_items WHERE pid = ?';

  try {
    const data = await withDbConnection(async (db: PoolConnection) => {
      const [products] = await db.execute<RowDataPacket[]>(productsQuery, [lang]);

      const promise = products.map(async (product) => {
        const [productItems] = await db.execute<RowDataPacket[]>(productItemsQuery, [product.id]);

        return {
          ...product,
          brandList: product.brandList?.split(',').map(Number) ?? [],
          newsList: product.newsList?.split(',').map(Number) ?? [],
          productItems
        }
      })

      const productsWithItems = await Promise.all(promise)
      return productsWithItems
    });

    return NextResponse.json({
      statusCode: 200,
      data: data
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to fetch product data'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
) {
  try {
    const {
      id,
      title,
      lang,
      brandList,
      newsList,
      m_url,
      m_title,
      m_description,
      m_keywords,
      updated_at,
      productItems,
      deleteItemIds
    } = await request.json() as Omit<ProducTableData, | "sort" | "created_at"> & { deleteItemIds: number[] };

    const updateProductQuery = `
      UPDATE products
      SET
        title = ?,
        lang = ?,
        brandList = ?,
        newsList = ?,
        m_url = ?,
        m_title = ?,
        m_description = ?,
        m_keywords = ?,
        updated_at = ?
      WHERE id = ?;
    `;

    const checkProductItemQuery = `
      SELECT COUNT(*) AS count
      FROM product_items
      WHERE id = ? AND pid = ?;
    `;

    const updateProductItemQuery = `
      UPDATE product_items
      SET
        title = ?,
        description = ?,
        img = ?, 
        updated_at = ?,
        url = ?
      WHERE id = ? AND pid = ?;
    `;

    const createProductItemQuery = `
      INSERT INTO product_items (
        title,
        description,
        img,
        created_at,
        updated_at,
        pid,
        url
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const deleteProductItemsQuery = `
      DELETE FROM product_items
      WHERE id = ?;
    `;

    const response = await withDbConnection(async (db: PoolConnection) => {
      try {
        await db.beginTransaction();

        // Update the product
        await db.execute<ResultSetHeader>(updateProductQuery, [
          title,
          lang,
          brandList.join(),
          newsList.join(),
          m_url,
          m_title,
          m_description,
          m_keywords,
          updated_at,
          id
        ]);

        console.log('productItems', productItems);
        console.log('deleteItemIds', deleteItemIds);

        // Delete product items if any
        if (deleteItemIds?.length > 0) {
          for (const deletedId of deleteItemIds) {
            await db.execute(deleteProductItemsQuery, [deletedId]);
          }
        }

        // Check and update or create each product item
        for (const item of productItems) {
          console.log('item', item);

          const [rows] = await db.execute<RowDataPacket[]>(checkProductItemQuery, [
            item.id,
            item.pid
          ]);

          console.log('rows', rows);

          const itemExists = rows[0].count > 0;

          if (itemExists) {
            await db.execute<ResultSetHeader>(updateProductItemQuery, [
              item.title,
              item.description,
              item.img,
              updated_at,
              item.url,
              item.id,
              item.pid
            ]);
          } else {
            await db.execute<ResultSetHeader>(createProductItemQuery, [
              item.title,
              item.description,
              item.img,
              updated_at,
              updated_at, // created_at
              id, // pid
              item.url
            ]);
          }
        }

        await db.commit();
        return NextResponse.json({
          statusCode: 200,
          msg: "Product updated successfully.",
          data: null
        });
      } catch (transactionError) {
        await db.rollback();
        console.log('Transaction error', transactionError);
        return NextResponse.json({
          statusCode: 500,
          errorMsg: 'Failed to update product'
        }, { status: 500 });
      }
    });

    return response
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to update product'
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
) {
  try {
    const {
      title,
      lang,
      brandList,
      newsList,
      m_url,
      m_title,
      m_description,
      m_keywords,
      created_at,
      updated_at,
      productItems
    } = await request.json() as Omit<ProducTableData, "id" | "sort">;

    const createProductQuery = `
    INSERT INTO products (
      title,
      lang,
      brandList,
      newsList,
      m_url,
      m_title,
      m_description,
      m_keywords,
      created_at,
      updated_at,
      sort
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    const maxSortQuery = 'SELECT MAX(sort) AS max_sort_value FROM products';

    const response = await withDbConnection(async (db: PoolConnection) => {
      try {
        await db.beginTransaction();
        const [rows] = await db.execute<RowDataPacket[]>(maxSortQuery);
        const sort_value = rows[0].max_sort_value + 1

        const [productResult] = await db.execute<ResultSetHeader>(createProductQuery, [
          title,
          lang,
          brandList.join(),
          newsList.join(),
          m_url,
          m_title,
          m_description,
          m_keywords,
          created_at,
          updated_at,
          sort_value // sort
        ]);
        console.log('productResult', productResult);

        const createProductItemQuery = `
          INSERT INTO product_items (
            title,
            description,
            img, 
            created_at,
            updated_at,
            pid, 
            url
          ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        const pid = productResult.insertId
        const promises = productItems.map(item => {
          return db.execute<ResultSetHeader>(createProductItemQuery, [
            item.title,
            item.description,
            item.img,
            created_at,
            updated_at,
            pid,
            item.url
          ]);
        });

        const productItemResult = await Promise.all(promises);

        console.log('productItemResult', productItemResult);

        await db.commit();

        return NextResponse.json({
          statusCode: 200,
          msg: "Product created successfully.",
          data: null
        });
      } catch (transactionError) {
        await db.rollback();
        console.log('Transaction error', transactionError);
        return NextResponse.json({
          statusCode: 500,
          errorMsg: 'Failed to create product'
        }, { status: 500 });
      }
    });

    return response;
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to create product'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
) {
  const deleteProductQuery = `DELETE FROM products WHERE id = ?;`;

  const deleteProductItemsQuery = `
      DELETE FROM product_items WHERE pid = ?;
    `;

  try {
    const { id } = await request.json();

    const response = await withDbConnection(async (db: PoolConnection) => {
      try {
        await db.beginTransaction();

        // Delete related product items
        await db.execute<ResultSetHeader>(deleteProductItemsQuery, [id]);

        // Delete the product
        const [productResult] = await db.execute<ResultSetHeader>(deleteProductQuery, [id]);

        const { affectedRows } = productResult;

        if (affectedRows > 0) {
          await db.commit();
          return NextResponse.json({
            statusCode: 200,
            msg: "Delete successful",
            data: null
          });
        } else {
          await db.rollback();
          return NextResponse.json({
            statusCode: 404,
            msg: "Product not found",
            data: null
          });
        }
      } catch (transactionError) {
        await db.rollback();
        console.log('Transaction error', transactionError);
        return NextResponse.json({
          statusCode: 500,
          errorMsg: 'Failed to delete product'
        }, { status: 500 });
      }
    });

    return response;
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({
      statusCode: 500,
      errorMsg: 'Failed to delete product'
    }, { status: 500 });
  }
}