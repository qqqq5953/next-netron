import useHttp from "@/hooks/useHttp";
import {
  ApiGetResponse,
  AboutForm,
  BrandTableData,
  CategoryTableData,
  Language,
  MetaForm,
  NewsTableData,
  ProducTableData,
  SolutionData
} from "./definitions";
import { isInvalidPageNumber } from "./utils";

const http = useHttp();

export async function fetchAbout(lang: Language): Promise<ApiGetResponse<AboutForm>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/about?adminLang=${lang}`, {
    next: { tags: ['about'] }
  });
  const result = await res.json();
  return result
}

export async function fetchAllBrands(lang: Language): Promise<ApiGetResponse<{
  rows: Pick<BrandTableData, "id" | "title">[],
  total: number
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands?adminLang=${lang}&page=all`);
  const result = await res.json();
  return result
}

export async function fetchAllNews(lang: Language): Promise<ApiGetResponse<{
  rows: Pick<NewsTableData, "id" | "title">[],
  total: number
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/news?adminLang=${lang}&page=all`);
  const result = await res.json();
  return result
}

export async function fetchBrands(lang: Language, page: string): Promise<ApiGetResponse<{ rows: BrandTableData[], total: number }>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands?adminLang=${lang}&page=${page}`, {
    next: {
      tags: ['brands']
    }
  });
  const result = await res.json();
  return result
}

export function swrFetchBrands(lang: Language, page: string) {
  return http.get<ApiGetResponse<{ rows: BrandTableData[], total: number }>>
    (`brands?adminLang=${lang}&page=${page}`, {
      revalidateOnFocus: false,
    });
}

export async function fetchCases(lang: Language, page: string, id: string): Promise<ApiGetResponse<{ rows: NewsTableData[], total: number }>> {
  page = isInvalidPageNumber(page) ? "1" : page
  lang = lang ?? "tw"

  const url = id ?
    `${process.env.BASE_URL}/api/netronAdmin/case/${id}?adminLang=${lang}&page=${page}` :
    `${process.env.BASE_URL}/api/netronAdmin/case?adminLang=${lang}&page=${page}`

  const res = await fetch(url, {
    next: {
      tags: ['case']
    }
  });
  const result = await res.json();
  return result
}

export function swrFetchCases(lang: Language | undefined, page: string, id: string) {
  page = isInvalidPageNumber(page) ? "1" : page
  lang = lang ?? "tw"

  const url = id ?
    `case/${id}?adminLang=${lang}&page=${page}` :
    `case?adminLang=${lang}&page=${page}`

  return http.get<ApiGetResponse<{ rows: NewsTableData[], total: number }>>(url, {
    revalidateOnFocus: false,
  });
}

export async function fetchCategoryForCases(lang: Language): Promise<ApiGetResponse<CategoryTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/case?adminLang=${lang}`, {
    next: {
      tags: ['category-case']
    }
  });
  const result = await res.json();
  return result
}

export async function fetchCategoryForNews(lang: Language): Promise<ApiGetResponse<CategoryTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/news?adminLang=${lang}`, {
    next: {
      tags: ['category-news']
    }
  });
  const result = await res.json();
  return result
}

export function swrFetchCategories(lang: Language | undefined, categoryType: "news" | "case") {
  return http.get<ApiGetResponse<CategoryTableData[]>>
    (`category/${categoryType}?adminLang=${lang ?? 'tw'}`, {
      revalidateOnFocus: false,
    });
}

export async function fetchMetaNews(lang: Language): Promise<ApiGetResponse<MetaForm>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/meta/news?adminLang=${lang}`, {
    next: {
      tags: ['meta-news']
    }
  });
  const result = await res.json();

  return result
}

export async function fetchMetaSuccess(lang: Language): Promise<ApiGetResponse<MetaForm>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/meta/success?adminLang=${lang}`, {
    next: {
      tags: ['meta-success']
    }
  });
  const result = await res.json();
  return result
}

export async function fetchNews(lang: Language, page: string, id: string): Promise<ApiGetResponse<{ rows: NewsTableData[], total: number }>> {
  page = isInvalidPageNumber(page) ? "1" : page

  const url = id ?
    `${process.env.BASE_URL}/api/netronAdmin/news/${id}?adminLang=${lang}&page=${page}` :
    `${process.env.BASE_URL}/api/netronAdmin/news?adminLang=${lang}&page=${page}`

  const res = await fetch(url, {
    next: {
      tags: ['news']
    }
  });
  const result = await res.json();
  return result
}

export function swrFetchNews(lang: Language, page: string, id: string) {
  page = isInvalidPageNumber(page) ? "1" : page

  const url = id ?
    `news/${id}?adminLang=${lang}&page=${page}` :
    `news?adminLang=${lang}&page=${page}`

  return http.get<ApiGetResponse<{ rows: NewsTableData[], total: number }>>(url, {
    revalidateOnFocus: false,
  });
}

export async function fetchProducts(lang: Language): Promise<ApiGetResponse<ProducTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export async function fetchSolutions(lang: Language): Promise<ApiGetResponse<SolutionData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/solutions?adminLang=${lang}`);
  const result = await res.json();
  return result
}