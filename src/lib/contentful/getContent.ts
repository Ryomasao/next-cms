import { createClient } from 'contentful'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import prism from '@mapbox/rehype-prism'
import addFileName from 'lib/hatena/addFileName'

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string
const client = createClient({
  space: spaceId,
  accessToken: token,
})

// https://silurus.dev/article/7DJobP47XUTkDjNavzyf2s
// 型も自動生成できるっぽい。すごい。
// とりあえずレスポンスみて適当に型づけしとく
type Post = {
  title: string
  markdown: string
}

export const getAllPost = async () => {
  const posts = await client.getEntries<Post>()
  return posts
}

/**
 * contentfulから記事を取得する
 * markdown形式をhtmlに変換する手順は@see src/lib/hatena/getPostMdとおなじ
 * @param id
 * @returns
 */
export const getPost = async (id: string) => {
  const post = await client.getEntry<Post>(id)
  const mdxSource = await genMdxSource(post.fields.markdown)
  return {
    ...post,
    mdxSource,
  }
}

const genMdxSource = async (md: string) => {
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
