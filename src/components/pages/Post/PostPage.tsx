import { MDXRemote } from 'next-mdx-remote'
import style from './PostPage.module.scss'
import BaseTemplate from '@/components/temps/BaseTemplate'
import { PostDetail } from '@/models/Post.model'
import { H1 } from '@/components/atoms/Heading'
import useToc from '@/components/hooks/useToc'
import tocStyle from '@/components/hooks/Toc.module.scss'

type Props = {
  post: PostDetail
}

const components = {
  h1: H1,
}

export default function PostPage(props: Props) {
  const { title, date, mdxSource } = props.post

  // 目次
  // こちらを参考にさせていただいている
  // https://blog.kimizuy.dev/posts/using-tocbot
  useToc()

  return (
    <BaseTemplate>
      <div className={style.pageContainer}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.meta}>
          <span>{date} 更新</span>
        </div>
        <div className={style.contentContainer}>
          <section className={`${style.content} content`}>
            {/**
             * ・Post内のメインコンテンツはmarkdownで書き出す
             * ・componentsにjsxを渡すことでmarkdown内でjsxを利用できる
             * */}

            <MDXRemote {...mdxSource} components={components} />
          </section>
          <aside>
            <div className={style.tocContainer}>
              <div className={`${tocStyle.toc} toc`}></div>
            </div>
          </aside>
        </div>
      </div>
    </BaseTemplate>
  )
}
