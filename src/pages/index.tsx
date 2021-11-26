import { InferGetStaticPropsType } from 'next'
import { getAllPostData } from '@/lib/hatena/getPostMd'
import LandingPage from '@/components/pages/LP/LandingPage'

// この非同期の関数は、build時に実行される
export async function getStaticProps() {
  const posts = await getAllPostData()

  return {
    // このpropsはPage配下のコンポーネントに渡される
    props: { posts },
  }
}

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LandingPage posts={posts} />
}
