import style from './PostPage.module.scss'
import BaseTemplate from 'components/temps/BaseTemplate'
import { PostDetail } from 'models/Post.model'

type Props = {
  post: PostDetail
}

export default function PostPage(props: Props) {
  const { title, contentHtml, date } = props.post
  return (
    <BaseTemplate>
      <div className={style.container}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.meta}>
          <span>{date} 更新</span>
        </div>
        <div
          className={style.content}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </BaseTemplate>
  )
}
