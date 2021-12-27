import { css } from '@emotion/react'

type Props = {
  children: React.ReactNode
  space?: number
  recursive?: boolean
}

export const Stack = (props: Props) => {
  const style = css`
    label: Stack;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & > {
      margin-top: 0;
      margin-bottom: 0;
    }

    ${props.recursive ? '& * + *' : '& > * + *'} {
      margin-top: ${props.space ? `${props.space}rem` : 'var(--s1)'};
    }
  `

  return <div css={style}>{props.children}</div>
}
