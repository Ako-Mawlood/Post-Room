import React, {useEffect, useState} from "react"

const useDebounce = (content: string, delay: number) => {
  const [debouncedContent, setDebouncedContent] = useState(content)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedContent(content)
    }, delay)

    return () => clearTimeout(handler)
  }, [content])
  return debouncedContent
}

export default useDebounce
