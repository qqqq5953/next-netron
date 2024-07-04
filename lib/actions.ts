'use server'

import { revalidateTag } from "next/cache";

export async function editAbout({
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
}) {
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
}) {
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
}) {
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