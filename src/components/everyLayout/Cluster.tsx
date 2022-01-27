import { css } from '@emotion/react'
import { Property } from 'csstype'

type Props = {
  children: React.ReactNode
  justfy?: Property.JustifyContent
  align?: Property.AlignItems
  space?: string
}

export const Cluster = (props: Props) => {
  const baseStyle = css({
    label: 'Cluster',
    display: 'flex',
    justifyContent: props.justfy || 'flex-start',
    alignItems: props.align || 'flex-start',
    gap: props.space || 'var(--s1)',
  })

  return <div css={baseStyle}>{props.children}</div>
}
