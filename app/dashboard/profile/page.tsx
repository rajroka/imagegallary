import { auth } from '@/lib/auth'
import React from 'react'

const page = async() => {

  const session = await auth()

  return (
      <div>
      <p>Email: {session?.user?.email}</p>
      <p>Name: {session?.user?.name}</p>
      {session?.user?.image && (
        <img src={session.user.image} alt={session.user.name || "Profile"} width={100} height={100} />
      )}
    </div>
  )
}

export default page