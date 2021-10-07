//const ENDPOINT = 'http://localhost:5000'

/**
 *FirebaseでJSONデータを用意する 
 初回データをつっこむ
 curl -X POST -d '[{"id" : "0", "name" : "taro"}, {"id" : "1", "name" : "jiro"}]' \
 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users.json'
 POSTだとkeyが振られて使いにくいので、今回はPUTで増やす
 curl -X PUT -d '[{"id" : "0", "name" : "taro"}, {"id" : "1", "name" : "jiro"}, {"id" : "2", "name" : "saburo"}]' \
 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users/-MlP3lTSo6oLUDHG0rcn.json'
 */

// データベースは確認が終わり次第セキュリティ設定を変更しよう
const ENDPOINT = 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users'
const KEY = '-MlP3lTSo6oLUDHG0rcn'

type User = {
  id: string
  name: string
}

export const getAllUser = async () => {
  const response = await fetch(`${ENDPOINT}/${KEY}.json`)
  const users = (await response.json()) as User[]
  return users
}

export const getUser = async (id: string) => {
  const response = await fetch(`${ENDPOINT}/${KEY}/${id}.json`)
  const user = (await response.json()) as User
  return user
}
