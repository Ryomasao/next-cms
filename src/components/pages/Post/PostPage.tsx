import BaseTemplate from 'components/temps/BaseTemplate'

type Props = {
  contentHtml: string
}

export default function PostPage(props: Props) {
  return (
    <BaseTemplate>
      <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
    </BaseTemplate>
  )
}
