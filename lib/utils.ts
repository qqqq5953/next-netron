import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiResponse, DataResponse, Language, MenuItem } from "./definitions";

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