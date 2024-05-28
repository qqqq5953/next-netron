import { ReactNode } from "react"
import { IconType } from "react-icons"

export type MenuItem = {
  name: string,
  path: string,
  children?: MenuItem[],
  icon?: IconType
}

export type MenuList = MenuItem[]