'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  name: string
  email: string
  bio?: string
  avatar?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 shadow">
            <img
              src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
              alt={user.name}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.bio && <p className="text-sm mt-1">{user.bio}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={() => router.push('/add-user')}>+ Add User</Button>
      </div>
    </div>
  )
}
