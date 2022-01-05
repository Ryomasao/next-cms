import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import A from '@/components/atoms/A'
import { ContentFulRepository } from '@/lib/contentful/getContent'

export async function getStaticProps() {
  const posts = await ContentFulRepository.getAllPost()

  return {
    props: { posts },
    revalidate: 10,
  }
}

export default function Contentful({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>post list</h1>
      <ul>
        {posts.items.map((post) => {
          const href = `/contentful/${post.sys.id}`
          return (
            <li key={post.sys.id}>
              <Link href={href} passHref>
                <A href={href}>
                  <article>{post.fields.title}</article>
                </A>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
