import {
  ApiGetResponse,
  AboutForm,
  // BrandTableData,
  // CategoryTableData,
  Language,
  NewsTableData,
  ProducTableData,
  BrandTableData,
  // MetaForm,
  // NewsTableData,
  // ProducTableData,
  // SolutionData
} from "./definitions";
import { isInvalidPageNumber } from "./utils";

export async function fetchAbout(lang: Language): Promise<ApiGetResponse<AboutForm>> {
  console.log('fetchAbout', lang);
  console.log('process.env.BASE_URL', process.env.BASE_URL);

  const res = await fetch(`${process.env.BASE_URL}/api/about?lang=${lang}`, {
    next: { tags: ['about-public'] }
  });

  const result = await res.json();

  return result
}

export async function fetchCaseList(lang: Language, page: string): Promise<ApiGetResponse<{ rows: NewsTableData[], total: number }>> {
  page = isInvalidPageNumber(page) ? "1" : page
  lang = lang ?? "tw"

  const url = `${process.env.BASE_URL}/api/caseList?lang=${lang}&page=${page}`

  const res = await fetch(url, {
    next: {
      tags: ['case-public']
    }
  });
  const result = await res.json();
  return result
}

export async function fetchNews(
  id: string,
  lang: Language,
  page: string
): Promise<ApiGetResponse<{ rows: NewsTableData[], total: number }>> {
  page = isInvalidPageNumber(page) ? "1" : page

  const url = id ?
    `${process.env.BASE_URL}/api/newsList/${id}?lang=${lang}&page=${page}` :
    `${process.env.BASE_URL}/api/newsList?lang=${lang}&page=${page}`

  const res = await fetch(url, {
    next: {
      tags: ['news-public']
    }
  });
  const result = await res.json();
  return result
}

export async function fetchServices(lang: Language, productId: string): Promise<ApiGetResponse<ProducTableData & {
  brandItems: {
    title: string,
    img: string,
    id: number,
    url: string | null
  }[]
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/services/${productId}?lang=${lang}`);
  const result = await res.json();
  return result
}

export async function fetchAllBrands(lang: Language): Promise<ApiGetResponse<{
  rows: Pick<BrandTableData, "id" | "title">[],
  total: number
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/brands?lang=${lang}&page=all`);
  const result = await res.json();
  return result
}