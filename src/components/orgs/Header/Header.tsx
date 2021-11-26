import Link from 'next/link'
import style from './Header.module.scss'

export default function Header() {
  return (
    <header>
      <div className={style.container}>
        <Link href="/">TOP</Link>
        <Link href="/about">このサイトについて</Link>
      </div>
    </header>
  )
}
