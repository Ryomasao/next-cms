export type Post = {
  id: string
  title: string
  date: string
}

export type PostDetail = Post & {
  contentHtml: string
  mdxSource: any
}
