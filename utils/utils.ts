import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MD_STRIP_REGEX =
  /!\[.*?]\(.*?\)|\[(.*?)]\(.*?\)|(```[\s\S]*?```|`[^`]*`)|~~|[*_]{1,3}([\s\S]+?)[*_]{1,3}|#+\s|>\s|- |\n/g
export const truncate = (content: string) => content.replace(MD_STRIP_REGEX, '').slice(0, 300)
