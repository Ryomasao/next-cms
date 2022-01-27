import { css } from '@emotion/react'

type Props = {
  children: React.ReactNode
  padding?: number
  invert?: boolean
  borderWidth?: number
}

export const Box = (props: Props) => {
  const baseStyle = css`
    label: Box;
    padding: ${props.padding ? `${props.padding}rem` : 'var(--s1)'};

    --color--light: #eee;
    --color--dark: #222;
    color: var(--color--dark);
    background-color: var(--color--light);

    --border--thin: 0;
    border-width: ${props.borderWidth
      ? `${props.borderWidth}px`
      : 'var(--border--thin)'};
    border-style: solid;

    & * {
      color: inherit;
    }
  `

  const invertStyle = css`
    ${baseStyle}
    color: var(--color--light);
    background-color: var(--color--dark);
  `
  return (
    <div css={props.invert ? invertStyle : baseStyle}>{props.children}</div>
  )
}
