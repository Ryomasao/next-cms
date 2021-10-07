import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'

//const ENDPOINT = 'http://localhost:5000'
const ENDPOINT = 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users'
const KEY = '-MlP3lTSo6oLUDHG0rcn'

/**
 *FirebaseでJSONデータを用意する 
 初回データをつっこむ
 curl -X POST -d '[{"id" : "0", "name" : "taro"}, {"id" : "1", "name" : "jiro"}]' \
 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users.json'
 POSTだとkeyが振られて使いにくいので、今回はPUTで増やす
 curl -X PUT -d '[{"id" : "0", "name" : "taro"}, {"id" : "1", "name" : "jiro"}, {"id" : "2", "name" : "saburo"}]' \
 'https://cms-test-3ba62-default-rtdb.firebaseio.com/users/-MlP3lTSo6oLUDHG0rcn.json'
 */

type User = {
  id: string
  name: string
}

export async function getStaticPaths() {
  const response = await fetch(`${ENDPOINT}/${KEY}.json`)
  const users = (await response.json()) as User[]
  const paths = users.map((user) => ({ params: { id: user.id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  if (!params?.id) {
    throw new Error('missing id')
  }

  const response = await fetch(`${ENDPOINT}/${KEY}/${params.id}.json`)
  const user = (await response.json()) as User
  return {
    props: { user },
  }
}

export default function Post(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  return (
    <div>
      <p>userid:{props.user.id}</p>
      <p>name:{props.user.name}</p>
    </div>
  )
}
