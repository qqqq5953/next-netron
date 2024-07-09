'use server'

import { revalidateTag } from "next/cache";
import { NewsTableData, ApiPostResponse, ApiPutResponse } from "./definitions";

export async function updateAbout({
  id,
  metaTitle,
  metaKeyword,
  metaDescription,
  customizedLink,
  content
}: {
  id: number,
  metaTitle: string,
  metaKeyword: string | undefined,
  metaDescription: string,
  customizedLink: string,
  content: string
}): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/about`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      metaTitle,
      metaKeyword,
      metaDescription,
      customizedLink,
      content
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('about')

  return result
}

export async function updateCategoryNews({
  id,
  title
}: {
  id: number,
  title: string,
}): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/category/news`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('category-news')

  return result
}

export async function updateMeta({
  id,
  metaTitle,
  metaKeyword,
  metaDescription
}: {
  id: number,
  metaTitle: string,
  metaKeyword: string | undefined,
  metaDescription: string,
}): Promise<ApiPutResponse<{
  affectedRows: number,
  changedRows: number
} | null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/meta/news`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      metaTitle,
      metaKeyword,
      metaDescription
    })
  });

  const result = await res.json();
  console.log('result', result);

  revalidateTag('meta-news')

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/news`, {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/news`, {
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