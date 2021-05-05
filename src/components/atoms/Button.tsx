import style from './Button.module.scss'
type Props = { children: React.ReactNode }

export default function A(props: Props) {
  return <button className={style.button}>{props.children}</button>
}
