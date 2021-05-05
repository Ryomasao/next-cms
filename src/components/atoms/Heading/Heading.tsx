import style from './Heading.module.scss'
type Props = { children: React.ReactNode }

export function H1(props: Props) {
  return (
    <h1 id={props.children as string} className={style.h1}>
      {props.children}
    </h1>
  )
}

export function H2(props: Props) {
  return <h2 id={props.children as string}>{props.children}</h2>
}

export function H3(props: Props) {
  return <h3 id={props.children as string}>{props.children}</h3>
}
