import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { ContentFulRepository } from 'lib/contentful/getContent'
import { genMdxSource } from 'lib/genMdxSource'

export async function getStaticPaths() {
  const posts = await ContentFulRepository.getAllPost()
  const paths = posts.items.map((post) => ({ params: { id: post.sys.id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
  preview,
}: GetStaticPropsContext<{ id: string }>) {
  if (!params?.id) {
    throw new Error('missing id')
  }
  const post = await ContentFulRepository.getPostById(params.id, {
    isPreview: preview,
  })
  const mdxSource = await genMdxSource(post.fields.markdown)
  return {
    props: { ...post, mdxSource },
  }
}

export default function Post(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {
    fields: { title },
    mdxSource,
  } = props
  return (
    <div>
      <p>{title}</p>
      <MDXRemote {...mdxSource} />
    </div>
  )
}
