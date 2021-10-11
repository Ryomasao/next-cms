import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { getPost, getAllPost } from 'lib/contentful/getContent'

export async function getStaticPaths() {
  const posts = await getAllPost()
  const paths = posts.items.map((post) => ({ params: { id: post.sys.id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  if (!params?.id) {
    throw new Error('missing id')
  }
  const post = await getPost(params.id)
  return {
    props: { post },
  }
}

export default function Post(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {
    post: {
      fields: { title },
      mdxSource,
    },
  } = props
  return (
    <div>
      <p>{title}</p>
      <MDXRemote {...mdxSource} />
    </div>
  )
}
