import HeroSection from './HeroSection'
import FooContent from './FooContent'
import BaseTemplate from 'components/temps/BaseTemplate'

type Post = {
  id: string
  title: string
  date: string
}

type Props = {
  posts: Post[]
}

export default function LandingPage(props: Props) {
  return (
    <BaseTemplate>
      <HeroSection />
      {props.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <FooContent />
      <FooContent />
    </BaseTemplate>
  )
}
