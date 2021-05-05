import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
//import remark from 'remark'
//import html from 'remark-html'
import prism from 'remark-prism'
import { parse, format } from 'date-fns'
import { serialize } from 'next-mdx-remote/serialize'

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
      id: fileName.replace(/\.(md|mdx)$/, ''),
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
      id: fileName.replace(/\.(md|mdx)$/, ''),
    },
  }))
  return idList
}

/**
 * 指定したidのPOSTを1件取得する
 * @param id
 * @returns
 */
export async function getPostData(id: string) {
  /**
   * ローカルに置いてあるファイルを利用する場合
   */
  //const fullPath = path.join(postsDirectory, `${id}.mdx`)
  //const fileContents = fs.readFileSync(fullPath, 'utf8')
  //const matterResult = matter(fileContents)
  //const processedContent = await remark()
  //  .use(html)
  //  .use(prism)
  //  .process(matterResult.content)
  //const contentHtml = processedContent.toString()
  //const date = parse(matterResult.data.time, 'yyyy-MM-dd HH:mm', new Date())
  //return {
  //  id,
  //  contentHtml,
  //  date: format(date, 'yyyy/MM/dd HH:mm:ss'),
  //  title: matterResult.data.title,
  //  ...matterResult.data,
  //}

  /**
   * MDX&リモートを利用する場合
   */
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(fileContents)
  const date = parse(data.time, 'yyyy-MM-dd HH:mm', new Date())
  // remark: markdownを構文解析。htmlに変換できる。
  // rehype: htmlを構文解析。html→html？

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
  })
  return {
    id,
    contentHtml: '',
    mdxSource: mdxSource,
    date: format(date, 'yyyy/MM/dd HH:mm:ss'),
    title: data.title,
  }
}
