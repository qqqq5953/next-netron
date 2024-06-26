import { IconType } from "react-icons"


type ErrorResponse = { statusCode: number, errorMsg: string };
export type DataResponse<T> = { statusCode: 200, data: T, msg?: string };
export type ApiResponse<T> =
  | ErrorResponse
  | DataResponse<T>

export type MenuItem = {
  name: string,
  path: string,
  children?: MenuItem[],
  icon?: IconType
}

export type MenuList = MenuItem[]

export type Language = 'tw' | 'en' | 'cn'

export type MetaForm = {
  m_title: string,
  m_keywords: string,
  m_description: string,
}

export type AboutForm = {
  id: number,
  m_title: string,
  m_keywords: string,
  m_description: string,
  m_url: string,
  content: string,
}

export type BrandTableData = {
  id: number,
  title: string,
  img: string,
  sort: number,
  content: string,
  edit_at: string | null,
  created_at: string | null,
  updated_at: string | null,
  m_title: string,
  m_keywords: string | null,
  m_description: string | null,
  m_url: string | null,
}

export type CategoryTableData = {
  title: string;
  sort: string;
}

export type ProducTableData = {
  id: number,
  title: string,
  lang: string,
  sort: number,
  brandList: number[],
  newsList: number[],
  created_at: string | null,
  updated_at: string | null,
  m_title: string,
  m_keywords: string | null,
  m_description: string | null,
  m_url: string | null,
  productItems: any[]
}

export type SolutionData = {
  id: number,
  title: string,
  content: string,
  sort: number,
  lang: string
  newsList: number[],
  m_title: string,
  m_keywords: string | null,
  m_description: string | null,
  type: string,
  m_url: string | null,
  created_at: string | null,
  updated_at: string | null
}

export type NewsTableData = {
  id: number,
  title: string,
  cid: number,
  description: string,
  img: string,
  content: string,
  lang: string,
  status: 0 | 1,
  sort: number,
  m_title: string,
  m_keywords: string | null,
  m_description: string | null,
  m_url: string | null,
  edit_at: string | null,
  post_date: string | null,
  created_at: string,
  updated_at: string,
  show: 0 | 1,
  type: "case" | "news",
  mode: "OnlineEventAttendanceMode" | "OfflineEventAttendanceMode" | "MixedEventAttendanceMode" | null,
  location: string | null,
  county: string | null,
  street: string | null,
  lecturer: string | null,
  start_at: string | null,
  end_at: string | null,
  price: string | null,
  currency: "TWD" | "USD" | null,
  soldout_at: string | null,
  website: string | null,
  hostCompany: string | null,
  hostWeb: string | null,
}