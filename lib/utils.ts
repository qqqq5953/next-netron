import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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