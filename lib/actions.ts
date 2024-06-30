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

