import Link from 'next/link'
import { Post } from '@/models/Post.model'
import A from '@/components/atoms/A'
import style from './PostLink.module.scss'

type Props = Post & {
  className?: string
}

export default function PostLink(props: Props) {
  const href = `/${props.id}`

  return (
    <Link href={href} passHref>
      <A href={href} className={props.className}>
        <article className={style.article}>
          <p className={style.date}>{props.date}に更新</p>
          <p className={style.title}>{props.title || 'タイトルなし'}</p>
        </article>
      </A>
    </Link>
  )
}
