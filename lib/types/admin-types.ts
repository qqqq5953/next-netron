import { IconType } from "react-icons"

export type MenuItem = {
  name: string,
  path: string,
  children?: MenuItem[],
  icon?: IconType
}

export type MenuList = MenuItem[]

export type Language = 'tw' | 'en' | 'cn'

export type AboutForm = {
  m_title: string,
  m_keywords: string,
  m_description: string,
  m_url: string,
  content: string,
}

export type NewsTableData = {
  id: string,
  title: string,
  cid: number,
  description: string,
  img: string,
  content: string,
  lang: string,
  status: 0 | 1,
  sort: number,
  m_title: string,
  m_keywords: string,
  m_description: string,
  m_url: string,
  edit_at: string,
  post_date: string,
  created_at: string,
  updated_at: string,
  show: 0 | 1,
  type: "case" | "news",
  mode: string,
  location: string,
  county: string,
  street: string,
  lecturer: string,
  start_at: string,
  end_at: string,
  price: string,
  currency: string,
  soldout_at: string,
  website: string,
  hostCompany: string,
  hostWeb: string,
}[]