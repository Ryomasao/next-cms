import HeroSection from './HeroSection'
import FooContent from './FooContent'
import BaseTemplate from 'components/temps/BaseTemplate'

export default function LandingPage() {
  return (
    <BaseTemplate>
      <HeroSection />
      <FooContent />
      <FooContent />
    </BaseTemplate>
  )
}
