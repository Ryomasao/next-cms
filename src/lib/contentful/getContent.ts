import { createClient } from 'contentful'

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN as string

// https://silurus.dev/article/7DJobP47XUTkDjNavzyf2s
// 型も自動生成できるっぽい。すごい。
// とりあえずレスポンスみて適当に型づけしとく
type Post = {
  title: string
  markdown: string
}

type GetPostOptions = {
  isPreview?: boolean
}
export class ContentFulRepository {
  public static async getAllPost(option?: GetPostOptions) {
    const client = this.getClient(option?.isPreview)
    const posts = await client.getEntries<Post>()
    return posts
  }

  public static async getPostById(id: string, option?: GetPostOptions) {
    const client = this.getClient(option?.isPreview)
    const post = await client.getEntry<Post>(id)
    return post
  }

  private static getClient(isPreview?: boolean) {
    const previewModeParam = {
      host: 'preview.contentful.com',
      space: spaceId,
      accessToken: previewToken,
    }

    const defaultParam = {
      host: 'cdn.contentful.com',
      space: spaceId,
      accessToken: token,
    }

    return createClient(isPreview ? previewModeParam : defaultParam)
  }
}
