import { InferGetStaticPropsType, GetStaticPropsContext } from 'next'
//import { getAllUser, getUser } from 'lib/firebase/getUser'

export async function getStaticPaths() {
  //const users = await getAllUser()
  const users = [{ id: 'a', name: 'a' }]
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
  //const user = await getUser(params.id)
  const user = { id: 'a', name: 'a' }
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
