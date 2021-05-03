import clsx from 'clsx'
import style from './LandingPage.module.scss'
import PostLink from 'components/mols/PostLink'

type Post = {
  id: string
  title: string
  date: string
}

type Props = {
  posts: Post[]
  className?: string
}

export default function PostSection(props: Props) {
  const className = clsx(style.postSection, props.className)
  return (
    <section className={className}>
      {props.posts.map((post) => (
        <PostLink
          key={post.id}
          id={post.id}
          className={style.postLink}
          title={post.title}
          date={post.date}
        />
      ))}
    </section>
  )
}
