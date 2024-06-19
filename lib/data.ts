import { Language, ApiResponse, BrandTableData, NewsTableData, ProducTableData } from "./definitions";
import { SolutionData } from "./types/admin-types";

export async function fetchAllBrands(lang: Language): Promise<ApiResponse<{
  rows: Pick<BrandTableData, "id" | "title">[],
  total: number
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/brands?adminLang=${lang}&page=all`);
  const result = await res.json();
  return result
}

export async function fetchAllNews(lang: Language): Promise<ApiResponse<{
  rows: Pick<NewsTableData, "id" | "title">[],
  total: number
}>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/news?adminLang=${lang}&page=all`);
  const result = await res.json();
  return result
}

export async function fetchProducts(lang: Language): Promise<ApiResponse<ProducTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export async function fetchSolutions(lang: Language): Promise<ApiResponse<SolutionData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/solutions?adminLang=${lang}`);
  const result = await res.json();
  return result
}