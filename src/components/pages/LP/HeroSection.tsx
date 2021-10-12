import Image from 'next/image'

export default function HeroSection() {
  return (
    <section>
      <Image
        src="/assets/img/hero.jpeg"
        width={500}
        height={100}
        layout="responsive"
        alt="hero"
      />
    </section>
  )
}
