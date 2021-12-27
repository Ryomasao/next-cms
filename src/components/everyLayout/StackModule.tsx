import React, { FC } from 'react'
import styles from './Stack.module.scss'

type Props = {
  space?: number
  recursive?: boolean
  parentProps?: Props
}

/**
 * CSS ModuleでEveryLayoutのstackをがんばってみた例
 * Note
 * MDXで利用すると、typeが素直に使えない。未解決。
 *  if (typeof child.type === typeof StackModule) {
 */
export const StackModule: FC<Props> = (props) => {
  const style = props.space
    ? ({ '--mt': `${props.space}rem` } as React.CSSProperties)
    : undefined

  const parentStyle = props.parentProps?.space
    ? ({ '--mt': `${props.parentProps.space}rem` } as React.CSSProperties)
    : undefined

  const elements = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      // 1.childがStackコンポーネントの場合、親のspaceを渡す
      if (typeof child.type === typeof StackModule) {
        return React.cloneElement(child, { parentProps: props })
      }

      return React.cloneElement(child, { style: style })
    }
    return child
  })

  return (
    // Stackが別のStackの子になる場合、親のstyleを適用
    <div className={styles.stack} style={parentStyle || style}>
      {elements}
    </div>
  )
}
