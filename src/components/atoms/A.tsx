import React from 'react'
import style from './A.module.scss'

type Props = JSX.IntrinsicElements['a'] & {
  children: React.ReactNode
}

export default React.forwardRef<HTMLAnchorElement, Props>(function A(
  props,
  ref,
) {
  const { children, ...aTagProps } = props
  return (
    <a {...aTagProps} className={style.a} ref={ref}>
      {children}
    </a>
  )
})
