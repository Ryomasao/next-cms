import { css } from '@emotion/react'

type Props = {
  children: React.ReactNode
  max?: string
  gutters?: string
  andText?: boolean
  intrinsic?: boolean
}

export const Center = (props: Props) => {
  const baseStyle = css({
    label: 'Center',
    '--measure': '60ch',
    maxWidth: props.max || 'var(--measure)',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: props.gutters || 'var(--s1)',
    paddingRight: props.gutters || 'var(--s1)',
    boxSizing: 'content-box',
    ...(props.intrinsic
      ? {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }
      : null),
    ...(props.andText
      ? {
          textAlign: 'center',
        }
      : null),
  })

  return <div css={baseStyle}>{props.children}</div>
}
