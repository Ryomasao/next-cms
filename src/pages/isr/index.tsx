import { InferGetStaticPropsType } from 'next'
import { getAllUser, getUser } from 'lib/firebase/getUser'

export async function getStaticProps() {
  const users = await getAllUser()

  return {
    props: { users },
  }
}

export default function Isr({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>user list</h1>
      {users.map((user) => {
        return <p key={user.id}>{user.name}</p>
      })}
    </div>
  )
}
