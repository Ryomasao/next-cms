import { css } from '@emotion/react'

type Props = {
  children: React.ReactNode
  // 左右どちらの要素をサイドバーとして処理するか
  side?: 'left' | 'right'
  // サイドバーのwidth
  sideWidh?: string
  // サイドバーじゃないほうのwidth
  contentWidth?: string
  // gap
  space?: string
  //
  noStrech?: boolean
}

export const Sidebar = (props: Props) => {
  const { side = 'left' } = props

  const contentStyle = {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: props.contentWidth || '50%',
  }

  const baseStyle = css({
    label: 'WithSidebar',
    display: 'flex',
    flexWrap: 'wrap',
    gap: props.space || 'var(--s1)',

    '& > *': {
      flexGrow: 0,
    },

    ...(side === 'left'
      ? {
          '& > :last-child': contentStyle,
        }
      : {
          '& > :first-child': contentStyle,
        }),
  })

  return <div css={baseStyle}>{props.children}</div>
}
