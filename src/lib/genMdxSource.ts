import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import prism from '@mapbox/rehype-prism'
import addFileName from '@/lib/hatena/addFileName'

export const genMdxSource = async (md: string) => {
  const { content } = matter(md)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        [
          addFileName,
          { tagName: 'div', attributes: { className: 'code-container' } },
        ],
        prism,
      ],
    },
  })
  return mdxSource
}
