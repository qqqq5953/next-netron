import {
  ApiGetResponse,
  AboutForm,
  // BrandTableData,
  // CategoryTableData,
  Language,
  // MetaForm,
  // NewsTableData,
  // ProducTableData,
  // SolutionData
} from "./definitions";

export async function fetchAbout(lang: Language): Promise<ApiGetResponse<AboutForm>> {
  console.log('fetchAbout', lang);
  console.log('process.env.BASE_URL', process.env.BASE_URL);

  const res = await fetch(`${process.env.BASE_URL}/api/about?lang=${lang}`, {
    next: { tags: ['about-public'] }
  });

  const result = await res.json();

  return result
}