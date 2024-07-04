import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiResponse, DataResponse, Language, MenuItem } from "./definitions";
import { MenuList as MenuListType } from '@/lib/definitions'
import { BsPersonVcard } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";
import { CgToolbox } from "react-icons/cg";
import { SiFuturelearn } from "react-icons/si";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MAX_FILE_SIZE = 5000000;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png"
]

export function checkFileType(file: File) {
  if (file?.name) {
    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return true;
    }
  }
  return false;
}

export function findCurrentLanguage(adminLang: string | null) {
  let lang: Language = "tw";

  if (adminLang && ["tw", "en", "cn"].includes(adminLang)) {
    lang = adminLang as Language;
  }

  return lang
}

export function convertToMenuObj(navs: MenuItem[], parentBreadcrumb: string[] = []) {
  return navs.reduce((menuObj, nav) => {
    const currentBreadcrumb = [...parentBreadcrumb, nav.name];

    if (nav.path) {
      menuObj[nav.path] = currentBreadcrumb;
    }

    if (nav.children) {
      menuObj = {
        ...menuObj,
        ...convertToMenuObj(nav.children, currentBreadcrumb),
      };
    }

    return menuObj;
  }, {} as Record<MenuItem['path'], MenuItem['name'][]>);
};


export function isSuccessResponse<T>(response: ApiResponse<T>): response is DataResponse<T> {
  return response.statusCode === 200;
}

export function isPositiveInteger(input: string) {
  const regex = /^[1-9]\d*$/;
  return regex.test(input);
}

export function isInvalidPageNumber(page: string | null) {
  return page !== null && !isPositiveInteger(page)
}

export const menuList: MenuListType = [
  { name: "關於我們", path: "/netronAdmin/about", icon: BsPersonVcard },
  {
    name: "最新消息", path: "", icon: IoNewspaperOutline, children: [
      { name: "分類管理", path: "/netronAdmin/category/news" },
      { name: "消息清單", path: "/netronAdmin/news" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/news" },
    ]
  },
  {
    name: "雲產品服務", path: "", icon: IoIosCloudOutline, children: [
      { name: "品牌項目", path: "/netronAdmin/brands" },
      { name: "產品項目", path: "/netronAdmin/product" },
    ]
  },
  { name: "解決方案", path: "/netronAdmin/solutions", icon: CgToolbox },
  {
    name: "成功案例", path: "", icon: SiFuturelearn, children: [
      { name: "分類管理", path: "/netronAdmin/category/case" },
      { name: "案例清單", path: "/netronAdmin/case" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/success" },
    ]
  },
]

export const redirectPathMap: Record<string, string> = {
  "/netronAdmin/news/2": "/netronAdmin/news",
  "/netronAdmin/news/5": "/netronAdmin/news",
  "/netronAdmin/news/9": "/netronAdmin/news",
  "/netronAdmin/case/3": "/netronAdmin/case",
  "/netronAdmin/case/14": "/netronAdmin/case",
}

export function getBreadCrumbs(pathname: string) {
  const menuListObj = convertToMenuObj(menuList)
  const redirectPath = redirectPathMap[pathname]
  const breadcrumbs = redirectPath ? menuListObj[redirectPath] : menuListObj[pathname]

  return breadcrumbs
}