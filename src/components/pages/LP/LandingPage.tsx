import HeroSection from './HeroSection'
import PostSection from './PostSection'
import FooContent from './FooContent'
import style from './LandingPage.module.scss'
import { Post } from 'models/Post.model'
import BaseTemplate from 'components/temps/BaseTemplate'

type Props = {
  posts: Post[]
}

export default function LandingPage(props: Props) {
  return (
    <BaseTemplate>
      {/** 
     * 
      <HeroSection />
    */}
      <PostSection posts={props.posts} className={style.postSection} />
      <FooContent />
    </BaseTemplate>
  )
}
