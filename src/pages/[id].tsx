import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { getAllPostIds, getPostData } from 'lib/hatena/getPostMd'
import PostPage from 'components/pages/Post/PostPage'

// URLが外部データに依存する場合に利用する
export async function getStaticPaths() {
  // 投稿記事を取得して、パスとして利用する
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  // paramがないときがどんなときなのかよくわからない
  // nextが提供する型としてはありえるみたいだけど。
  // https://github.com/vercel/next.js/discussions/16522
  // ひとまずparamsは絶対あるよと伝える
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getPostData(params!.id)
  return {
    props: { post },
  }
}

export default function Post(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return <PostPage post={props.post} />
}
