import { type ClassValue, clsx } from 'clsx'
import RemoveMarkdown from 'remove-markdown'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const throttle = (func: Function, delay: number) => {
  let lastCall = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - lastCall < delay) return
    lastCall = now
    func(...args)
  }
}

export const truncate = (content: string) => RemoveMarkdown(content).slice(0, 300).replace(' ', '\n')
