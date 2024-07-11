import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiGetResponse, ApiPostResponse, ApiPutResponse, Language, MenuItem } from "./definitions";
import { MenuList as MenuListType } from '@/lib/definitions'
import { BsPersonVcard } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";
import { CgToolbox } from "react-icons/cg";
import { SiFuturelearn } from "react-icons/si";
import { DataResponse } from "./types/admin-types";
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MAX_FILE_SIZE = 10000000; // 10MB

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

export function handleModifyApiResponse<T>(response: ApiPostResponse<T> | ApiPutResponse<T>): void {
  if (isSuccessResponse(response)) {
    toast.success(response.msg)
  } else if (isSuccess204Response(response)) {
    toast.info(response.msg)
  } else {
    toast.error(response.errorMsg)
  }
}

export function isSuccessResponse<T>(
  response: ApiGetResponse<T> | ApiPostResponse<T> | ApiPutResponse<T>
): response is DataResponse<T> {
  return response.statusCode === 200
}

export function isSuccess204Response<T>(
  response: ApiPostResponse<T> | ApiPutResponse<T>
): response is DataResponse<T> {
  return response.statusCode === 204
}

export function isPositiveInteger(input: string) {
  const regex = /^[1-9]\d*$/;
  return regex.test(input);
}

export function isInvalidPageNumber(page: string | null) {
  return page !== null && !isPositiveInteger(page)
}

export function toLocaleISOString(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = new Date(date.getTime() - timezoneOffset).toISOString();
  return localISOTime.slice(0, 16); // yyyy-mm-ddTHH:mm
}

export function toTimestampString(date: Date) {
  const timezoneOffset = date.getTimezoneOffset(); // offset in milliseconds
  const localeISOTimestamp = new Date(date.getTime() - timezoneOffset).toLocaleString('sv');
  return localeISOTimestamp // yyyy-mm-dd HH:mm:ss
}

export function toYYYYMMDD(date: Date) {
  return toTimestampString(date).split(" ")[0] // yyyy-mm-dd
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