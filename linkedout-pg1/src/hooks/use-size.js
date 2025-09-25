import useResizeObserver from "@react-hook/resize-observer"
import { useLayoutEffect, useState } from "react"
import '@/components/ui/image.css'

export const useSize = (ref, threshold = 50) => {

  const [size, setSize] = useState(null)

  const updateSize = (newSize) => {
    if (!size) {
      setSize(newSize)
      return
    }

    const widthDiff = Math.abs(newSize.width - size.width)
    const heightDiff = Math.abs(newSize.height - size.height)

    if (widthDiff > threshold || heightDiff > threshold) {
      setSize(newSize)
    }
  }

  useLayoutEffect(() => {
      if (ref.current) {
          const { width, height } = ref.current.getBoundingClientRect()
          updateSize({ width, height })
      }
  }, [ref.current, size])

  useResizeObserver(ref, (entry) => {
      const { width, height } = entry.contentRect
      if (!size || size.width !== width || size.height !== height) {
        updateSize({ width, height })
      }
  })

  return size
}
