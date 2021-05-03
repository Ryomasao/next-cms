import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import { parse, format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'docs/hatena/work2')

/**
 * markdownが置いてあるディレクトリのファイルを読んで、markdownのメタデータを取得して返す
 * @returns
 */
export function getAllPostData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const matterResult = matter(fileContents)

    const date = parse(matterResult.data.time, 'yyyy-MM-dd HH:mm', new Date())
    return {
      id: fileName.replace(/\.md$/, ''),
      date: format(date, 'yyyy/MM/dd HH:mm:ss'),
      title: matterResult.data.title,
    }
  })
  return allPostData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  const idList = fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }))
  return idList
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .use(prism)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  const date = parse(matterResult.data.time, 'yyyy-MM-dd HH:mm', new Date())
  return {
    id,
    contentHtml,
    date: format(date, 'yyyy/MM/dd HH:mm:ss'),
    title: matterResult.data.title,
    ...matterResult.data,
  }
}
