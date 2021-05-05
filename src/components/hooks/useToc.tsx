import { useEffect } from 'react'
import tocbot from 'tocbot'

type Props = {
  tocSelector?: string
  contentSelector?: string
  headingSelector?: string
}

export default function useToc({
  tocSelector = '.toc',
  contentSelector = '.content',
  headingSelector = 'h1',
}: Props = {}) {
  useEffect(() => {
    tocbot.init({
      tocSelector,
      contentSelector,
      headingSelector,
    })
    return () => tocbot.destroy()
  }, [])
}
