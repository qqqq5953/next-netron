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