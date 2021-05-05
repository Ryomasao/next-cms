import { MDXRemote } from 'next-mdx-remote'
import style from './PostPage.module.scss'
import BaseTemplate from 'components/temps/BaseTemplate'
import { PostDetail } from 'models/Post.model'
import Button from 'components/atoms/Button'

type Props = {
  post: PostDetail
}

const components = {
  Button,
}

export default function PostPage(props: Props) {
  const { title, date, mdxSource } = props.post
  return (
    <BaseTemplate>
      <div className={style.container}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.meta}>
          <span>{date} 更新</span>
        </div>
        <div className={style.content}>
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </BaseTemplate>
  )
}
