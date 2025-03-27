'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  name: string
  email: string
}

export default function HomePage() {
  const [count, setCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data: User[]) => setCount(data.length))
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-2">👋 Welcome to the User Directory</h1>
      <p className="text-gray-600 text-lg mb-6">
        A simple app to view and add public user profiles.
      </p>

      <div className="text-lg mb-4">
        <span className="font-semibold">Total users:</span> {count}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => router.push('/users')}>View All Users</Button>
        <Button onClick={() => router.push('/add-user')} variant="outline">
          Add New User
        </Button>
      </div>
    </main>
  )
}
