/**
 * Note
 * APIを使わずに、エクスポートしたデータをmarkdownに置き換えることにしたので、この機能は使ってない
 */
import base64 from 'base-64'

// TODO envから取得するようにする
const END_POINT = ''
const userName = ''
const password = ''

/**
 * はてなのブログから記事を取得する(ver API)
 * @returns
 */
export async function getAllPosts() {
  const headers = new Headers()
  const raw = `${userName}:${password}`
  headers.set('Authorization', `Basic ${base64.encode(raw)}`)
  const res = await fetch(`${END_POINT}/entry`, {
    method: 'GET',
    headers,
  })

  // xml形式で返却される
  // TODO パース & 必要な形式に変換して返す
  const xml = await res.text()
  return {}
}
