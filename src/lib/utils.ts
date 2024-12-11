import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
type cover_size = 'cover_small' |'cover_big' | 'micro' | 'thumb' |'screenshot_med'

export const getCover = (size: cover_size, image_id: string): string => {
  
    return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id ?? 'nocover'}.jpg`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

