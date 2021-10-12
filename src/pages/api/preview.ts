import { ContentFulRepository } from 'lib/contentful/getContent'

const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN as string

const preview = async (req: any, res: any) => {
  if (req.query.secret !== previewToken || !req.query.id) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const post = await ContentFulRepository.getPostById(req.query.id, {
    isPreview: true,
  })

  if (!post) {
    return res.status(401).json({ message: 'Invalid id' })
  }

  res.setPreviewData({})

  res.redirect(`/contentful/${post.sys.id}`)
}

export default preview
