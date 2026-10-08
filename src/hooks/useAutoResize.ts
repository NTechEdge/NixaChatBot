import { useEffect, type RefObject } from 'react'

export function useAutoResize(
  ref: RefObject<HTMLTextAreaElement | null>,
  value: string,
  minHeight: number = 56,
  maxHeight: number = 240
) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.height = `${minHeight}px`
    const scrollHeight = el.scrollHeight
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
    el.style.height = `${newHeight}px`
  }, [ref, value, minHeight, maxHeight])
}
