'use server'

import { revalidateTag } from "next/cache";
import { NewsTableData, ApiPostResponse, ApiPutResponse, BrandTableData, CategoryTableData, MetaForm, ProducTableData } from "./definitions";

export async function updateAbout({
  id,
  m_title,
  m_keywords,
  m_description,
  customizedLink,
  content
}: Omit<MetaForm, "type"> & {
  customizedLink: string,
  content: string
}): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/about`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      m_title,
      m_keywords,
      m_description,
      customizedLink,
      content
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('about')

  return result
}

export async function updateBrand({
  id,
  m_title,
  m_keywords,
  m_description,
  m_url,
  title,
  content,
  img,
  updated_at,
}: Omit<BrandTableData, "sort" | "edit_at" | "created_at" | "lang">): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      m_title,
      m_keywords,
      m_description,
      m_url,
      title,
      content,
      img,
      updated_at
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('brands')

  return result
}

export async function updateCase({
  id,
  m_title,
  m_keywords,
  m_description,
  m_url,
  updated_at,
  cid,
  title,
  description,
  lang,
  img,
  content,
}: Pick<NewsTableData, | 'id' | 'm_title' | 'm_keywords' | 'm_description' | 'm_url' | 'updated_at' | 'cid' | 'title' | 'description' | 'lang' | 'img' | 'content'>): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/case`, {
    method: "PUT",
    body: JSON.stringify({
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
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('case')

  return result
}

export async function updateCategoryCases({
  id,
  title,
  updated_at
}: Pick<CategoryTableData, "id" | "title" | "updated_at">): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/case`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
      updated_at
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-case')

  return result
}

export async function updateCategoryNews({
  id,
  title,
  updated_at
}: Pick<CategoryTableData, "id" | "title" | "updated_at">): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/news`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
      updated_at
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-news')

  return result
}

export async function updateMeta({
  id,
  type,
  m_title,
  m_keywords,
  m_description
}: MetaForm): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const url = type === "news" ?
    `${process.env.BASE_URL}/api/netronAdmin/meta/news` :
    `${process.env.BASE_URL}/api/netronAdmin/meta/success`

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      id,
      type,
      m_title,
      m_keywords,
      m_description
    })
  });

  const result = await res.json();
  console.log('result', result);

  if (type === "news") {
    revalidateTag('meta-news')
  } else if (type === "success") {
    revalidateTag('meta-success')
  }

  return result
}

export async function updateNews({
  id,
  m_title,
  m_keywords,
  m_description,
  m_url,
  mode,
  lecturer,
  start_at,
  end_at,
  price,
  currency,
  soldout_at,
  website,
  hostCompany,
  hostWeb,
  updated_at,
  cid,
  title,
  img,
  content,
}: Omit<NewsTableData, 'description' | 'lang' | 'status' | 'sort' | 'post_date' | 'show' | 'location' | 'county' | 'street' | 'type' | 'edit_at' | 'created_at'>): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/news`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      m_title,
      m_keywords,
      m_description,
      m_url,
      mode,
      lecturer,
      start_at,
      end_at,
      price,
      currency,
      soldout_at,
      website,
      hostCompany,
      hostWeb,
      updated_at,
      cid,
      title,
      img,
      content
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('news')

  return result
}

export async function updateProduct({
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
}:
  Omit<ProducTableData, | "sort" | "created_at"> &
  { deleteItemIds: number[] }
): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product`, {
    method: "PUT",
    body: JSON.stringify({
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
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('news')

  return result
}

export async function addCategoryCases({
  title,
  lang,
  type,
  created_at,
  updated_at
}: Omit<CategoryTableData, "id" | "sort">): Promise<ApiPostResponse<null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/case`, {
    method: "POST",
    body: JSON.stringify({
      title,
      type,
      lang,
      created_at,
      updated_at
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-case')

  return result
}

export async function addNews({
  m_title,
  m_keywords,
  m_description,
  m_url,
  mode,
  lecturer,
  start_at,
  end_at,
  price,
  currency,
  soldout_at,
  website,
  hostCompany,
  hostWeb,
  updated_at,
  cid,
  title,
  img,
  content,
  lang,
  post_date,
  location,
  county,
  street,
  created_at,
}: Omit<NewsTableData, 'id' | 'description' | 'status' | 'sort' | 'show' | 'type' | 'edit_at'>): Promise<ApiPostResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/news`, {
    method: "POST",
    body: JSON.stringify({
      m_title,
      m_keywords,
      m_description,
      m_url,
      mode,
      lecturer,
      start_at,
      end_at,
      price,
      currency,
      soldout_at,
      website,
      hostCompany,
      hostWeb,
      updated_at,
      cid,
      title,
      img,
      content,
      lang,
      post_date,
      location,
      county,
      street,
      created_at,
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('news')

  return result
}

export async function addCase({
  m_title,
  m_keywords,
  m_description,
  m_url,
  updated_at,
  created_at,
  cid,
  title,
  description,
  img,
  content,
  lang,
}: Pick<NewsTableData, 'm_title' | 'm_keywords' | 'm_description' | 'm_url' | 'updated_at' | 'created_at' | 'cid' | 'title' | 'description' | 'lang' | 'img' | 'content'>): Promise<ApiPostResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/case`, {
    method: "POST",
    body: JSON.stringify({
      m_title,
      m_keywords,
      m_description,
      m_url,
      updated_at,
      created_at,
      cid,
      title,
      description,
      img,
      content,
      lang,
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('case')

  return result
}

export async function addBrand({
  m_title,
  m_keywords,
  m_description,
  m_url,
  title,
  content,
  img,
  updated_at,
  created_at,
  edit_at,
  lang
}: Omit<BrandTableData, "id" | "sort">): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands`, {
    method: "POST",
    body: JSON.stringify({
      m_title,
      m_keywords,
      m_description,
      m_url,
      title,
      content,
      img,
      updated_at,
      created_at,
      edit_at,
      lang
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('brands')

  return result
}

export async function addProduct({
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
}: Omit<ProducTableData, "id" | "sort">): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product`, {
    method: "POST",
    body: JSON.stringify({
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
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('product')

  return result
}

export async function deleteCategoryCases({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/case`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-case')

  return result
}

export async function deleteCategoryNews({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/news`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-news')

  return result
}

export async function deleteBrand({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('brands')

  return result
}

export async function deleteNews({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/news`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('news')

  return result
}

export async function deleteProduct({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('product')

  return result
}

export async function deleteCases({ id }: { id: number }) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/case`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('case')

  return result
}